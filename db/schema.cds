using {
  Currency,
  managed,
  sap
} from '@sap/cds/common';

namespace sap.capire.bookshop;


entity Books : managed {
  key ID       : Integer;
      title    : localized String(111);
      descr    : localized String(1111);
      author   : Association to Authors;
      genre    : Association to Genres;
      stock    : Integer;
      price    : Decimal;
      currency : Currency;
      image    : LargeString;

}

annotate Books with {
  modifiedAt @odata.etag
};


entity Authors : managed {
  key ID           : Integer;
      name         : String(111);
      dateOfBirth  : Date;
      dateOfDeath  : Date;
      placeOfBirth : String;
      placeOfDeath : String;
      @Capabilities : {
        ReadRestrictions   : {
          $Type         : 'Capabilities.ReadRestrictionsType',
          Readable,
          CustomHeaders : [{
            $Type : 'Capabilities.CustomParameter',
            Name  : 'sap-Header'
          }]
        },

        UpdateRestrictions : {
          $Type         : 'Capabilities.UpdateRestrictionsType',
          Updatable,
          CustomHeaders : [{
            $Type : 'Capabilities.CustomParameter',
            Name  : 'sap-Header'
          }


          ],

        },
      }

      books        : Association to many Books
                       on books.author = $self;
      bonus        : Association to many Bonus
                       on bonus.author = $self;


}

annotate Authors with {
  modifiedAt @odata.etag
};

/**
 * Hierarchically organized Code List for Genres
 */
entity Genres : sap.common.CodeList {
  key ID       : Integer;
      parent   : Association to Genres;
      children : Composition of many Genres
                   on children.parent = $self;
}

entity Bonus : managed {
  key ID     : Integer;
      name   : String(3);
      value  : String(3);
      author : Association to Authors;
}

annotate Bonus with {
  modifiedAt @odata.etag
};
