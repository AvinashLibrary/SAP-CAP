// using  as service from '../../srv/cat-service';
using AdminService as service from '../../srv/admin-service';
// annotate AdminService.Authors with @(
//     UI:{
//         HeaderInfo:{
//             $Type:'UI.HeaderInfoType',
//             TypeName:'Name',
//             TypeNamePlural:'Name',
//             Description:{
//                 $Type:'UI.DataField',
//                 Value:dateOfBirth
//             },
//             Title:{
//                 $Type:'UI.DataField',
//                 Value:name
//             }
//         },

//         SelectionFields :[
//             name,
//             dateOfBirth,
//             placeOfDeath,
//             placeOfBirth
//         ],

//         LineItem:[
//             {
//                 $Type:'UI.DataField',
//                 Value:placeOfBirth
//             },
//             {
//                 $Type:'UI.DataField',
//                 Value:name
//             }
//         ]
//     }
// );