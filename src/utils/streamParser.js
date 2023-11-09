export const chunks = [
  "TEST",
  "{\n",
  " ",
  ' "',
  "CURRENT",
  " LOCATION",
  "/d",
  "escription",
  '":',
  ' "',
  "Moving",
  " pre",
  "ps",
  " in",
  " Berlin",
  '",\n',
  " ",
  ' "',
  "CURRENT",
  " LOCATION",
  "/sub",
  "steps",
  "/",
  "0",
  '":',
  ' "',
  "Start",
  " by",
  " looking",
  " for",
  " moving",
  " companies",
  " that",
  " can",
  " help",
  " with",
  " your",
  " relocation",
  '",\n',
  " ",
  ' "',
  "CURRENT",
  " LOCATION",
  "/sub",
  "steps",
  "/",
  "1",
  '":',
  ' "',
  "Organ",
  "ise",
  " and",
  " sort",
  " out",
  " items",
  " you",
  "'re",
  " moving",
  " to",
  " Lisbon",
  '",\n',
  " ",
  ' "',
  "CURRENT",
  " LOCATION",
  "/sub",
  "steps",
  "/",
  "2",
  '":',
  ' "',
  "Notify",
  " relevant",
  " authorities",
  " and",
  " organisations",
  " in",
  " Berlin",
  " about",
  " your",
  " move",
  '",\n\n',
  " ",
  ' "',
  "TRANS",
  "IT",
  "/d",
  "escription",
  '":',
  ' "',
  "Preparing",
  " for",
  " the",
  " move",
  " from",
  " Berlin",
  " to",
  " Lisbon",
  '",\n',
  " ",
  ' "',
  "TRANS",
  "IT",
  "/sub",
  "steps",
  "/",
  "0",
  '":',
  ' "',
  "Ensure",
  " the",
  " moving",
  " company",
  " has",
  " the",
  " correct",
  " date",
  " and",
  " address",
  '",\n',
  " ",
  ' "',
  "TRANS",
  "IT",
  "/sub",
  "steps",
  "/",
  "1",
  '":',
  ' "',
  "Secure",
  " personal",
  " travel",
  " arrangements",
  " from",
  " Berlin",
  " to",
  " Lisbon",
  '",\n\n',
  " ",
  ' "',
  "DEST",
  "INATION",
  "/d",
  "escription",
  '":',
  ' "',
  "Moving",
  " in",
  " actions",
  " in",
  " Lisbon",
  '",\n',
  " ",
  ' "',
  "DEST",
  "INATION",
  "/sub",
  "steps",
  "/",
  "0",
  '":',
  ' "',
  "Check",
  " into",
  " your",
  " new",
  " home",
  " or",
  " temporary",
  " housing",
  " in",
  " Lisbon",
  '",\n',
  " ",
  ' "',
  "DEST",
  "INATION",
  "/sub",
  "steps",
  "/",
  "1",
  '":',
  ' "',
  "Start",
  " the",
  " process",
  " of",
  " updating",
  " your",
  " address",
  ",",
  " registering",
  " for",
  " utilities",
  ",",
  " and",
  " other",
  " necessary",
  " services",
  " in",
  " Lisbon",
  '"\n',
  "}",
];

// export const badChunks = [
//   `CURRENT LOCATION/description: before we go anywhere, we need to prep at home\n
//             CURRENT LOCATION/substeps/0: Do this\n
//             CURRENT LOCATION/substeps/1: Do this\n
//             TRANSIT/description: Do this\n
//             TRANSIT/substeps/0: Do this\n
//             TRANSIT/substeps/1: Do this\n
//             DESTINATION/description: Do this\n
//             DESTINATION/substeps/0: Do this\n
//             DESTINATION/substeps/1: Do this\n`,
// ];
const valid_ends = ["},", "\n", "}\n"];

const data = {};

function isANumber(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function attemptToParseURLH(
  raw,
  original_data,
  setData,
  smokeAlarm,
  setSmokeAlarm
) {
  // if (condition) {
  //   setSomethingNotValid(true);
  // }

  const data = { ...original_data };

  const joined_chunks = raw.join("");
  const split_on_valid_ends = joined_chunks.split("\n");
  split_on_valid_ends
    .filter((row) => {
      const [key, value] = row.split(":");
      if (!key || !value) {
        return false;
      }
      if (key.trim().length < 1) {
        return false;
      }
      return true;
    })
    .forEach((row) => {
      let [key, value] = row.split(":");
      key = key.trim().replace(/"/g, "");
      value = value.trim().replace(/"/g, "");
      key = key.split("/");
      if (!data[key[0]]) {
        data[key[0]] = {
          description: "",
          substeps: [],
        };
      }
      if (!data[key[0]].hasOwnProperty(key[1])) {
        data[key[0]][key[1]] = key[2] && isANumber(key[2]) ? [] : "";
      }
      key[2]
        ? (data[key[0]][key[1]][key[2]] = value)
        : (data[key[0]][key[1]] = value);
    });

  setData(data);
}

export { attemptToParseURLH };
