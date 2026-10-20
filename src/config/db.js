import mysql from "serverless-mysql";

export const pool = mysql({
  config: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: 3306,
    database: "kss",
  },
  // config: {
  //   host: "172.232.225.191",
  //   user: "kss_mariauser",
  //   password: "p55#xsK55db!",
  //   port: 3306,
  //   database: "kurniasafety_com_pro",
  // },
});
