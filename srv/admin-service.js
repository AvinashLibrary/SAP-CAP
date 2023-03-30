module.exports = async (srv) => {

  const cds = require('@sap/cds');
  const { Books , Foo} = await srv.entities;
  srv.prepend(async (srv2) => await srv2.on('CREATE', 'Foo', async (req) => { 
      let q2 = INSERT.into (Foo) .entries ({ ID: 1232, name: 'Av', original_age: '13' }) 
      let val = await cds.run (q2);
      console.log(val);
      
  }))
 
  // srv.prepend(async (srv2) => await srv2.on('READ', 'Foo', async (req) => {  
  //   console.log("Heloo")
  //   }))

  
}