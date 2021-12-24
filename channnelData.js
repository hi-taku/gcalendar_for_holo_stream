const EVENT_COLOR = CalendarApp.EventColor;

class ChannelDataTableItem {
  constructor(name, calendarId, calColor, eventColor) {
    this.name = name;
    this.calendarId = calendarId;
    this.calColor = calColor;
    this.eventColor = eventColor;
  }
}

const channelDataTable = {
  // 0th gen.
  // miko
  'UC-hM6YJuNYVAmUWxeIr9FeA': new ChannelDataTableItem(
    'Miko Ch. さくらみこ',
    CALENDAR_ID.SAKURA_MIKO,
    "#FEA3AF",
    EVENT_COLOR.PALE_RED,
  ),

  // 2nd gen.
  // shion
  'UCXTpFs_3PqI41qX2d9tL2Rw': new ChannelDataTableItem(
    'Shion Ch. 紫咲シオン',
    CALENDAR_ID.MURASAKI_SHION,
    "#9864b5",
    EVENT_COLOR.MAUVE,
  ),

  // 3rd gen.
  // pekora
  'UC1DCedRgGHBdm81E1llLhOQ': new ChannelDataTableItem(
    'Pekora Ch. 兎田ぺこら',
    CALENDAR_ID.USADA_PEKORA,
    "#BFD6FD",
    EVENT_COLOR.PALE_BLUE,
  ),

  // 6th gen.
  // sakamata
  'UCIBY1ollUsauvVi4hW4cumw': new ChannelDataTableItem(
    'Chloe ch. 沙花叉クロヱ - holoX -',
    CALENDAR_ID.SAKAMATA_KUROE,
    "#a80000",
    EVENT_COLOR.RED,
  )
}