require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Static division credentials
const divisionCredentials = {
  MANJESHWARAM: "MANJE2680",
};

// Static sector credentials (Option 1)
const sectorCredentials = {
  BAKRABAIL: "PATHO2645",
  DAIGOLI: "daigo345",
  KADAMBAR: "KADAMB2597",
  KEDUMBADY: "KEDUM2680",
  KUNJATHUR: "KUNJA2598",
  MANJESHWARAM: "MANJE2666",
  MEENJA: "MEENJ2673",
  VORKADY: "vorka345",
};

// Static unit credentials (Option 2)
const unitCredentials = {
  BADIMALE: "	BADIM20698",
  BAKRABAIL: "BAKR2407",
  BOLMARNORTH: "	BOLMA20649",
  BOLMARSOUTH: "BOLMA2407",
  CMNAGAR: "PATHU20670",
  KAJE: "KAJE2407",
  KOOTTURASTHE: "KOOTT20663",
  KUDUMBALACHIL: "KUDUM20656",
  MALAAR: "MAL123",
  NADIBAIL: "NADIB20677",
  THALAKKI: "THALA20705",
  ADAKALAKATTE: "adkal2340",
  ANEKKALLU: "ANEKK20684",
  DAIGOLI: "DAIGO20397",
  GUVEDAPADUPPU: "GUVED20691",
  KUNTAPADAVU: "KUNTA2407",
  PALLEDAPADPU: "PALLE2407",
  POYYATHBAIL: "POYYA20432",
  POYYATHBAILNORTH: "POYYA20446",
  SULLIYAME: "SULLI20404",
  URNI: "URNI20411",
  ARIMALA: "ARIMA20922",
  BADAJE: "BAD123",
  CMNAGAR: "CM NA20929",
  DARKAS: "darka123",
  DURGIPALLA: "DURGI20894",
  EDIYA: "EDIYA2407",
  KADAMBAR: "KADAMBAR",
  KADAMBARSCHOOL: "KADA2407",
  MACHAMPADI: "MACHA20859",
  PAPILA: "PAP3280",
  PUCHATHABAIL: "pucha123",
  AMAI: "AMAI2407",
  BACHALIKE: "sharelike",
  BAKIMAR: "BAKIM20873",
  BATIYADUKKA: "BAT123",
  GERUKATE: "GERU2407",
  KEDUMBADI: "KEDUM20999",
  KEDUMBADIBAIL: "Kedum12345",
  KOPPALA: "KOPPA21041",
  MUDIMAR: "MUDIM21027",
  PAVOOR: "PAVOO21034",
  SUNNAMGALA: "SUNNA21048",
  THOKEBADRIYA: "THOKE21020",
  BSNAGAR: "BS NA20516",
  HARWAR: "HARWA20509",
  HYGLODHI: "HYG123",
  IRSHADNAGAR: "IRSHA20481",
  KUCHIKAD: "KUCHI2680",
  KUNJATHUR: "KUNJA20474",
  MOULANAROAD: "MOULA20530",
  SANNADKA: "SANNA14603",
  TENTHMILE: "10TH 20523",
  THUMINAD: "THUMI20502",
  UDYAWARAM: "udaya123",
  AKKARA: "akkara123",
  BEJJA: "BEJJA20936",
  CHECKPOST: "CHECK2407",
  CHOUKI: "CHO123",
  GUDDAGERI: "GUDDA20467",
  HOSANGADI: "HOSAN20866",
  MAJIBAIL: "MAJIB20901",
  MANJESHWARAM: "MANJE20488",
  MOODAMBAIL: "MOODA20572",
  PADATHUR: "CV3WW1",
  PANDYAL: "PANDYAL2407",
  POSOAT: "POSOA20908",
  RAILWAY: "RAILWAY2407",
  VALIYAVALAPP: "VALIYA2407",
  VAMANJOOR: "VAMAN2407",
  BADAVINAGAR: "BADAVI2407",
  BALIYUR: "BALIY20558",
  BATTIPPADAVU: "BATTI20579",
  BEJJANGALA: "bejja345",
  BERIKE: "BERIK14601",
  BORKALA: "BORKA20565",
  CHIGURUPADHE: "chigur765",
  JISTHIYA: "JISTHIYA07",
  KULAVAIL: "KUL2407",
  MADANGHAL: "MAD123",
  MIYAPPADAVU: "MIYAP20537",
  MUNNIPPADY: "MUNNI20551",
  SANTHADKA: "SANTH20544",
  THALAKALA: "THALAKALA09",
  BAKERYJUNCTION: "BAKERY2407",
  DHARMANAGAR: "DARMA20460",
  GANDHINAGAR: "GANDH20425",
  KOLIYOOR: "KOLIY20418",
  KOLIYOORPADAVU: "KOIYO20453",
  KOTEMAR: "KOTEM2680",
  MAJIRPALLA: "MAJIR20439",
  MORTHANA: "Morth1234",
  NACHAPADAVU: "NACHA2407",
  ORUPANGODI: "ORPAN2680",
  POYYA: "POY123",
  PURUSHANKODI: "PURUS21013",
  THOKE: "THOKE21006",
};
router.post("/", (req, res) => {
  const { type, name, password } = req.body;

  if (!type || !name || !password) {
    return res
      .status(400)
      .json({ message: "Type, name, and password required" });
  }

  let expectedPassword;
  let role = "";
  if (type === "division") {
    expectedPassword = divisionCredentials[name];
    role = name === "admin" ? "admin" : "sector";
  } else if (type === "sector") {
    expectedPassword = sectorCredentials[name];
    role = name === "admin" ? "admin" : "sector";
  } else if (type === "unit") {
    expectedPassword = unitCredentials[name.replace(/\s+/g, "").toUpperCase()];
    role = "unit";
  } else {
    return res
      .status(400)
      .json({ message: "Invalid type (use 'sector' or 'unit')" });
  }

  if (!expectedPassword) {
    return res.status(404).json({ message: `Unknown ${type}` });
  }

  if (password !== expectedPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT
  const payload = { name, role, isAdmin: role === "admin" };
  const token = jwt.sign(payload, process.env.JWT_SECRET || "dev_secret", {
    expiresIn: "8h",
  });

  res.json({
    token,
    name,
    role,
    isAdmin: role === "admin",
    message: `${type} login successful`,
  });
});

module.exports = router;

