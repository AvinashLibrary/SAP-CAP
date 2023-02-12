using AdminService as service from '../../srv/admin-service';

annotate service.Authors with @(UI.SelectionFields : [name
]);

annotate service.Books with @(UI.SelectionFields : [title
]);


annotate service.Authors with {
    ID @Common.Label : '{i18n>ID}'
};

annotate service.Authors with {
    name @Common.Label : '{i18n>Name}'
};

annotate service.Authors with {
    dateOfBirth @Common.Label : '{i18n>dateOfBirth}'
};

annotate service.Authors with {
    dateOfDeath @Common.Label : '{i18n>dateOfDeath}'
};

annotate service.Authors with @(
    UI.Facets                     : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>GeneralSection}',
            ID     : 'GeneralSection',
            Target : '@UI.FieldGroup#GeneralSection',
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>Books}',
            ID     : 'Books',
            Target : 'books/@UI.LineItem#Books',
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>Bonus}',
            ID     : 'Bonus',
            Target : 'bonus/@UI.LineItem#Bonus',
        },
    ],
    UI.FieldGroup #GeneralSection : {
        $Type : 'UI.FieldGroupType',
        Data  : [
            {
                $Type : 'UI.DataField',
                Value : ID,
                Label : '{i18n>ID}',
            },
            {
                $Type : 'UI.DataField',
                Value : name,
                Label : '{i18n>Name}',
            },
        ],
    }
);

annotate service.Books with @(UI.LineItem #Books : [
    {
        $Type : 'UI.DataField',
        Value : author_ID,
        Label : '{i18n>Authorid}',
    },
    {
        $Type : 'UI.DataField',
        Value : createdAt,
        Label : '{i18n>CreatedAt}',
    },
    {
        $Type : 'UI.DataField',
        Value : createdBy,
        Label : '{i18n>UserID}',
    },
    {
        $Type : 'UI.DataField',
        Value : currency_code,
        Label : '{i18n>Currency}',
    },
    {
        $Type             : 'UI.DataField',
        Value             : descr,
        Label             : '{i18n>Descr}',
        ![@UI.Importance] : #Low,
    },
    {
        $Type : 'UI.DataField',
        Value : genre_ID,
        Label : '{i18n>Genreid}',
    },
    {
        $Type : 'UI.DataField',
        Value : ID,
        Label : '{i18n>Id}',
    },
    {
        $Type : 'UI.DataField',
        Value : stock,
        Label : '{i18n>Stock}',
    },
    {
        $Type : 'UI.DataField',
        Value : price,
        Label : '{i18n>Price}',
    },
]);

annotate service.Bonus with @(UI.LineItem #Bonus : []);
annotate service.Authors with @(UI.LineItem #Authors : []);

annotate service.Authors with @(UI.LineItem : [
    {
        $Type : 'UI.DataField',
        Value : ID,
        Label : '{i18n>ID}',
    },
    {
        $Type : 'UI.DataField',
        Value : name,
        Label : '{i18n>Name}',
    },
    {
        $Type : 'UI.DataField',
        Value : books.title,
        Label : 'title',
    },
    {
        $Type : 'UI.DataField',
        Value : placeOfBirth,
        Label : '{i18n>Placeofbirth}',
    },
    {
        $Type : 'UI.DataField',
        Value : placeOfDeath,
        Label : '{i18n>Placeofdeath}',
    },
    {
        $Type : 'UI.DataField',
        Value : books.descr,
        Label : '{i18n>Descr}',
    },
]);

annotate service.Authors with {
    ID @(
        Common.ValueList                : {
            $Type          : 'Common.ValueListType',
            CollectionPath : 'Books',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : ID,
                ValueListProperty : 'ID',
            }, ],
        },
        Common.ValueListWithFixedValues : true
    )
};

annotate service.Books with {
    ID @Common.Text : {
        $value                 : title,
        ![@UI.TextArrangement] : #TextOnly,
    }
};

annotate service.Authors with {
    placeOfBirth @Common.Label : '{i18n>Placeofbirth}'
};


annotate service.Authors with {
    placeOfDeath @Common.Label : '{i18n>Placeofdeath}'
};

annotate service.Authors with {
    placeOfBirth @(
        Common.ValueList                : {
            $Type          : 'Common.ValueListType',
            CollectionPath : 'Authors',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : placeOfBirth,
                ValueListProperty : 'placeOfBirth',
            }, ],
        },
        Common.ValueListWithFixedValues : true
    )
};

annotate service.Authors with {
    name @(
        Common.ValueList                : {
            $Type          : 'Common.ValueListType',
            CollectionPath : 'Authors',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : name,
                    ValueListProperty : 'name',
                },
                {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'ID',
                },
            ],
        },
        Common.ValueListWithFixedValues : false
    )
};

annotate service.Authors with @(
    UI.SelectionPresentationVariant #tableView  : {
        $Type               : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type          : 'UI.PresentationVariantType',
            Visualizations : ['@UI.LineItem', ],
        },
        SelectionVariant    : {
            $Type         : 'UI.SelectionVariantType',
            SelectOptions : [],
        },
        Text                : 'Table View',
    },
    UI.LineItem #tableView                      : [],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type               : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type          : 'UI.PresentationVariantType',
            Visualizations : ['@UI.LineItem#tableView', ],
        },
        SelectionVariant    : {
            $Type         : 'UI.SelectionVariantType',
            SelectOptions : [],
        },
        Text                : 'Table View 1',
    }
);

annotate service.Books with @(
    UI.LineItem #tableView                     : [
        {
            $Type : 'UI.DataField',
            Value : author_ID,
            Label : 'author_ID',
        },
        {
            $Type : 'UI.DataField',
            Value : price,
            Label : 'price',
        },
        {
            $Type : 'UI.DataField',
            Value : stock,
            Label : 'stock',
        },
        {
            $Type : 'UI.DataField',
            Value : title,
            Label : 'title',
        },
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : descr,
            Label : 'descr',
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type               : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type          : 'UI.PresentationVariantType',
            Visualizations : ['@UI.LineItem#tableView', ],
        },
        SelectionVariant    : {
            $Type         : 'UI.SelectionVariantType',
            SelectOptions : [],
        },
        Text                : 'Table View Books',
    }
);
