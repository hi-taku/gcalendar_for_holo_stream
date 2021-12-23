function main() {
  initCalendar(CALENDAR_ID);
  Object.keys(channelDataTable).forEach((channelId) => {
    registerCalenderEventfromYTStream(channelId);
  })
}

function registerCalenderEventfromYTStream(channelId){
  let ytEvents = [];
  ytEvents = getYtEvents(channelId);

  ytEvents.forEach((event) => {
    let calendarEvents = [];

    // get live event detail
    let liveEvent = getLiveEventInfo(event.id.videoId)

    calendarEvents = getDupulicateEvents(event.id.videoId);

    var date = new Date(liveEvent.liveStreamingDetails.scheduledStartTime);
    const startDate = new Date(date);
    const endDate = new Date(date.setHours(date.getHours() + 1));

    if (calendarEvents.length) {
      // when dupulicate a video event, update the calendar event;

    } else {
      // else, create new calendar event
      var calendarEvent = calendar.createEvent(event.snippet.title,
        startDate,
        endDate,
        {
          location: channelDataTable[channelId].name + '：https://youtu.be/' + event.id.videoId,

        });
      Logger.log('Event: ' + calendarEvent.getId());

      // change event color
      console.log('channelId', channelId)
      console.log('tableItem', channelDataTable[channelId])
      calendarEvent.setColor( channelDataTable[channelId].color )
    }
  })
}

/**
 * initialize google calendar by id
 */
function initCalendar(calendarId) {
  calendar = CalendarApp.getCalendarById(calendarId);
  console.log('calendar:', calendar);
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

  const now = new Date();
  const startDate = new Date(now.setDate(now.getDate() - 1));
  const endDate = new Date();
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