const c = CalendarApp.EventColor;

class ChannelDataTableItem {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

const channelDataTable = {
  // 0th gen.
  // miko
  'UC-hM6YJuNYVAmUWxeIr9FeA': new ChannelDataTableItem(
    'Miko Ch. さくらみこ',
    c.PALE_RED,
  ),

  // 2nd gen.
  // shion
  'UCXTpFs_3PqI41qX2d9tL2Rw': new ChannelDataTableItem(
    'Shion Ch. 紫咲シオン',
    c.MAUVE
  ),

  // 3rd gen.
  // pekora
  'UC1DCedRgGHBdm81E1llLhOQ': new ChannelDataTableItem(
    'Pekora Ch. 兎田ぺこら',
    c.CYAN
  ),


}