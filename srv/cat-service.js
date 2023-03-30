
module.exports = srv => {

  srv.on('getCustomerPayload', () => {
    var ocj = '2022-10-01'
    return ocj
  });
  srv.on('getCustomerPayloadObj', (req, res) => {
    var { id } = req.data
    console.log(id);
    var ocj = [{ id: 1, name: 'Aviansh' }, { id: 2, name: 'Rahul' }]
    return ocj
  });

  srv.on('getCustomArray', (req,res) => {
    var data =  [{Name:'Avinash Kumar'},{Name:'Rahul'},{Name:'Harsh'}]
    return data
  });

  srv.on('getETagCorrelation', (req,res) => {
    console.log(req)
    return "data"
  });

  
  srv.after('getETagCorrelation', (req,res) => {
    console.log(req)
    return "data"
  });

  srv.on('postCustomData', (req,res) => {
    console.log(req)
  })

}
