let calendar;

function main() {
  Object.keys(channelDataTable).forEach((channelId) => {
    initCalendar(channelId);
    registerCalendarEventfromYTStream(channelId);
  })
}

function registerCalendarEventfromYTStream(channelId) {
  let ytEvents = [];
  ytEvents = getYtEvents(channelId);

  ytEvents.forEach((event) => {
    let calendarEvents = [];

    // get live event detail
    let liveEvent = getLiveEventInfo(event.id.videoId)

    calendarEvents = getDupulicateEvents(event.id.videoId);

    var date = new Date();
    if ("liveStreamingDetails" in liveEvent) {
      date = new Date(liveEvent.liveStreamingDetails.scheduledStartTime);
    } else {
      date = new Date(event.snippet.publishTime)
    }
    const startDate = new Date(date);
    const endDate = new Date(date.setHours(date.getHours() + 1));

    calendarEvents.forEach((calendarEvent) => {
      calendarEvent.deleteEvent();
    })

    // else, create new calendar event
    const title = event.snippet.title + "：" + event.id.videoId;
    var calendarEvent = calendar.createEvent(
      title,
      startDate,
      endDate,
      {
        location: 'https://youtu.be/' + event.id.videoId,
      });
    Logger.log('Event: ' + calendarEvent.getId());

    // change event color
    console.log('channelId', channelId)
    console.log('tableItem', channelDataTable[channelId])
    calendarEvent.setColor( channelDataTable[channelId].eventColor )
  })
}

/**
 * initialize google calendar by id
 */
function initCalendar(channelId) {
  calendar = CalendarApp.getCalendarById(channelDataTable[channelId].calendarId);
  console.log('calendar:', calendar);

  // set calendar color
  if (channelDataTable[channelId].calColor !== null) {
    calendar.setColor(channelDataTable[channelId].calColor)
  }
}

/**
 * get video contents that have been published since one day ago.
 * 
 * @param {*} channelId youtube channel id
 * @returns
 */
function getYtEvents(channelId) {
  let date = new Date();
  date.setDate(date.getDate() - 1)

  var results = YouTube.Search.list('id, snippet', {
    channelId: channelId,
    publishedAfter: date.toISOString(),
  });

  console.log(results.items.length);
  results.items.forEach(function (item) {
    console.log('get Youtube Event:', item);
  });
  console.log('get Youtube Events:', results)

  return results.items
}

function getDupulicateEvents(videoId = "") {
  let rst = [];

  if (!calendar) {
    console.log('"calendar" not initialized')
    return
  }

  const date = new Date();
  const startDate = new Date(date.setFullYear(date.getFullYear() - 1));
  const endDate = new Date(date.setFullYear(date.getFullYear() + 2));
  console.log(startDate, endDate)
  const opt = { search: videoId }
  rst = calendar.getEvents(startDate, endDate, opt)

  console.log('calendar search result length:', rst.length);
  rst.forEach((item) => {
    console.log('calendar search result item:', item);
  })

  return rst;
}

function getLiveEventInfo(videoId) {
  var result = YouTube.Videos.list('liveStreamingDetails', {
    id: videoId,
  })

  return result.items[0];
}