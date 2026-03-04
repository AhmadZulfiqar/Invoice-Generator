const express = require("express");
const app = express();
const path = require("path");
// Add this if you are using method-override
const methodOverride = require("method-override"); 

// Settings & Middleware
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// IMPORTANT: Since you are not saving data in DB, 
// you can comment out or remove the main() database connection logic 
// to prevent the Vercel build from hanging.

// Your routes (app.get, app.post) go here...

// Update the listener for Vercel


// Export the app for Vercel


function numberToEnglish(n) {
    if (isNaN(n) || n === 0) return "Zero Rupees Only";
    let num = Math.round(n);
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const format = (v) => {
        if (v < 20) return a[v];
        if (v < 100) return b[Math.floor(v / 10)] + (v % 10 !== 0 ? " " + a[v % 10] : "");
        return a[Math.floor(v / 100)] + "Hundred " + (v % 100 !== 0 ? "and " + format(v % 100) : "");
    };

    let str = "";
    if (num >= 10000000) { str += format(Math.floor(num / 10000000)) + "Crore "; num %= 10000000; }
    if (num >= 100000) { str += format(Math.floor(num / 100000)) + "Lakh "; num %= 100000; }
    if (num >= 1000) { str += format(Math.floor(num / 1000)) + "Thousand "; num %= 1000; }
    if (num > 0) { str += format(num); }
    return str.trim() + " Rupees Only";
}
// Routes
app.get("/new", (req, res) => {
  res.render("index.ejs");
});

app.get("/", (req, res) => {
  res.render("form.ejs");
});
app.post("/add", async (req, res) => {
  try {
    const {
      difam,
      taxo250,
      taxo500,
      cerf,
      difam_qty,
      taxo250_qty,
      taxo500_qty,
      cerf_qty,
    } = req.body;
    // for difam
    function cal_difam(product, qty) {
      let rate = 153.0;
      let gross = qty * rate;
      let disc = gross * 0.15;
      let net = gross - disc;
      let aw = (net * 0.5) / 100;
      let total = net + aw;

      const fmt = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

      return {
        // These are the strings with commas for your frontend
        rate: rate.toLocaleString("en-US", fmt),
        gross: gross.toLocaleString("en-US", fmt),
        disc: disc.toLocaleString("en-US", fmt),
        net: net.toLocaleString("en-US", fmt),
        aw: aw.toLocaleString("en-US", fmt),
        total: total.toLocaleString("en-US", fmt),

        // Keep the original numbers here ONLY for your Grand Totals
        cal: { rate, gross, disc, net, aw, total },
      };
    }
        function cal_cerf(product, qty) {
        let rate = 157.25;
      let gross = qty * rate;
      let disc = gross * 0.18;
      let net = gross - disc;
      let aw = (net * 0.5) / 100;
      let total = net + aw;

      const fmt = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

      return {
        // These are the strings with commas for your frontend
        rate: rate.toLocaleString("en-US", fmt),
        gross: gross.toLocaleString("en-US", fmt),
        disc: disc.toLocaleString("en-US", fmt),
        net: net.toLocaleString("en-US", fmt),
        aw: aw.toLocaleString("en-US", fmt),
        total: total.toLocaleString("en-US", fmt),

        // Keep the original numbers here ONLY for your Grand Totals
        cal: { rate, gross, disc, net, aw, total },
      };
    }
    function cal_taxo250(product, qty) {
      let rate = 86.7;
      let gross = qty * rate;
      let disc = gross * 0.10;
      let net = gross - disc;
      let aw = (net * 0.5) / 100;
      let total = net + aw;

      const fmt = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

      return {
        // These are the strings with commas for your frontend
        rate: rate.toLocaleString("en-US", fmt),
        gross: gross.toLocaleString("en-US", fmt),
        disc: disc.toLocaleString("en-US", fmt),
        net: net.toLocaleString("en-US", fmt),
        aw: aw.toLocaleString("en-US", fmt),
        total: total.toLocaleString("en-US", fmt),

        // Keep the original numbers here ONLY for your Grand Totals
        cal: { rate, gross, disc, net, aw, total },
      };
    }
    function cal_taxo500(product, qty) {
      let rate = 130.9;
      let gross = qty * rate;
      let disc = gross * 0.15;
      let net = gross - disc;
      let aw = (net * 0.5) / 100;
      let total = net + aw;

      const fmt = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

      return {
        // These are the strings with commas for your frontend
        rate: rate.toLocaleString("en-US", fmt),
        gross: gross.toLocaleString("en-US", fmt),
        disc: disc.toLocaleString("en-US", fmt),
        net: net.toLocaleString("en-US", fmt),
        aw: aw.toLocaleString("en-US", fmt),
        total: total.toLocaleString("en-US", fmt),

        // Keep the original numbers here ONLY for your Grand Totals
        cal: { rate, gross, disc, net, aw, total },
      };
    }
    
    
    
    const invoiceData = [
      {
        name: "683/Difam Plus Inj 5x2ml",
        qty: difam_qty,
        // We call the function and take ONLY the raw 'cal' object for math
        result: cal_difam(difam, difam_qty),
        cal: cal_difam(difam, difam_qty).cal, 
      },
      {
        name: "592/Taxomic 250mg IM/IV Inj",
        qty: taxo250_qty,
        result: cal_taxo250(taxo250, taxo250_qty),
        cal: cal_taxo250(taxo250, taxo250_qty).cal,
      },
      {
        name: "593/Taxomic 500mg IM/IV Inj",
        qty: taxo500_qty,
        result: cal_taxo500(taxo500, taxo500_qty),
        cal: cal_taxo500(taxo500, taxo500_qty).cal,
      },
      {
        name: "586/Cefresh 500mg inj",
        qty: cerf_qty,
        result: cal_cerf(cerf, cerf_qty),
        cal: cal_cerf(cerf, cerf_qty).cal,
      },
    ];
    let tsum = 0,
      trate = 0,
      tgross = 0,
      taw = 0,
      tdisc = 0,
      ttotal = 0;
      let i=0;

    invoiceData.forEach((item) => {
      tsum += Number(item.qty) || 0;
      trate += Number(item.cal.rate) || 0;
      tgross += Number(item.cal.gross) || 0;
      taw += Number(item.cal.aw) || 0;
      tdisc += Number(item.cal.disc) || 0;
      ttotal += Number(item.cal.total) || 0;
    }); 
    let c=0;
    for(let j=0;j<invoiceData.length;j++){
        if(invoiceData[j].qty>0){
            c++;
        }
    }

    // Helper options for 2 decimal places and commas
    const currencyFormat = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    // Helper options for whole numbers with commas (no decimals)
    const qtyFormat = { minimumFractionDigits: 0, maximumFractionDigits: 0 };

    // Formatting the results
    let displaySum = tsum.toLocaleString("en-US", qtyFormat); // e.g., 2,300
    let displayRate = trate.toLocaleString("en-US", currencyFormat); // e.g., 2,300.00
    let displayGross = tgross.toLocaleString("en-US", currencyFormat);
    let displaydisc = tdisc.toLocaleString("en-US", currencyFormat);
    let displayaw = taw.toLocaleString("en-US", currencyFormat);
    let displayTotal = ttotal.toLocaleString("en-US", currencyFormat);
    const currentDate = new Date().toLocaleDateString('en-GB'); // Results in "04/03/2026"
    console.log(displayTotal); // Now outputs "2,300.00" instead of "2300.00"
    let roundedValue = Math.round(ttotal); 

// 2. NOW format it with commas for the frontend
// ... your existing code above ...
    let newroundedValue = Math.round(ttotal); 

    // 1. Call the function here
    let totalInWords = numberToEnglish(newroundedValue); 

    // 2. Your existing formatting
    let roundTotal = newroundedValue.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    res.render("index.ejs", {
      invoiceData,
      displaySum,
      currentDate,
      displayRate,
      displaydisc,
      displayaw,
      displayGross,
      displayTotal,
      roundTotal,
      totalInWords, // 3. Make sure this is added here!
      c,
    });

    // res.render("index.ejs",{invoiceData,tsum,trace,tdisc,taw,tgross,ttotal});
    //  console.log(invoiceData,tsum,trace,tdisc,taw,tgross,ttotal);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving invoice data");
  }
});

// ... (existing code)

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;


