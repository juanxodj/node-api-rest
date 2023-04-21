import Invoice from "@models/invoice";
import Afip from "@afipsdk/afip.js";

const index = async (req, res) => {};

const store = async (req, res) => {
  const {
    CantReg, // Cantidad de comprobantes a registrar
    PtoVta, // Punto de venta
    CbteTipo, // Tipo de comprobante (ver tipos disponibles)
    Concepto, // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
    DocTipo, // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
    DocNro, // Número de documento del comprador (0 consumidor final)
    CbteDesde, // Número de comprobante o numero del primer comprobante en caso de ser mas de uno
    CbteHasta, // Número de comprobante o numero del último comprobante en caso de ser mas de uno
    ImpTotal, // Importe total del comprobante
    ImpTotConc, // Importe neto no gravado
    ImpNeto, // Importe neto gravado
    ImpOpEx, // Importe exento de IVA
    ImpIVA, //Importe total de IVA
    ImpTrib, //Importe total de tributos
    MonId, //Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos)
    MonCotiz, // Cotización de la moneda usada (1 para pesos argentinos)
    Iva, // (Opcional) Alícuotas asociadas al comprobante
  } = req.body;

  const dateNow = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  const { body: invoiceData } = req;
  invoiceData.CbteFch = parseInt(dateNow.replace(/-/g, ""));

  try {
    const invoice = await Invoice.create(invoiceData);
    return res.status(200).json(invoice);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  const afip = new Afip({
    CUIT: 20111111112, // CUIT del contribuyente
    production: false, // (Opcional) true para usar los Web Services en modo producción
    cert: "certificado.crt", // (Opcional) ruta donde se encuentra el certificado, relativa a res_folder
    key: "clave.key", // (Opcional) ruta donde se encuentra el certificado, relativa a res_folder
    res_folder: "./certs", // (Opcional) Ruta de la carpeta donde se encuentran el cert y key
    ta_folder: "clave_del_certificado", // (Opcional) Ruta de la carpeta donde se guardaran los Token
  });

  try {
    const data = await afip.ElectronicBilling.createVoucher(invoiceData, true);

    console.log(data["CAE"]); //CAE asignado el comprobante
    console.log(data["CAEFchVto"]); //Fecha de vencimiento del CAE (yyyy-mm-dd)

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export { index, store };
