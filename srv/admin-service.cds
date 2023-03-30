using { sap.capire.bookshop as my } from '../db/schema';
service AdminService {
  entity Foo as projection on my.Foo;
  entity Books as projection on my.Books;
  entity Authors as projection on my.Authors;
  // entity Bonus as projection on my.Bonus;
entity Bonus as projection on my.Bonus actions {
    action acceptBonus() returns Bonus;
    
  };
}

