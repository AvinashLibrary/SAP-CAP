using {sap.capire.bookshop as my} from '../db/schema';


type customArray  :  {
  Name : String(20);
};




service CatalogService @(path : '/browse') {
  function getCustomerPayload() returns Date;
  function getCustomerPayloadObj(id : String) returns array of  String;
  function getCustomArray() returns array of customArray ;
  function getETagCorrelation() returns   String ;  
  function postCustomData() returns array of String;

  // two ways of adding multiple values 1. array of 2. type customArray : many

  entity Books as
    select from my.Books {
      *,
      author.name as author
    }
    excluding {
      createdBy,
      modifiedBy
    };


  @requires : 'authenticated-user'
  action   submitOrder(book : Books:ID, quantity : Integer);
}
