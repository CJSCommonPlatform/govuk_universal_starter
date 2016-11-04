/*
Check page number 6 of this particular document explaining regex to validate UK postcode:
https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/488478/Bulk_Data_Transfer_-_additional_validation_valid_from_12_November_2015.pdf
*/

import { AbstractControl } from '@angular/forms';

export class CustomValidators{

  static postcodeValidator(control: AbstractControl) {
      let postCode = control.value || '';
      let postCodeRegex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})$/i;
      return postCodeRegex.test(postCode.replace(/ /g,'')) ?
          null :
          { 'ukPostcode': false};
  }  

  static ninValidator(control: AbstractControl) {
      let nin = control.value || '';
      let ninRegex = /^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]?\s*$/i;
      return ninRegex.test(nin.replace(/ /g,'')) ?
          null :
          { 'nin': false};
  }

  static emailValidator(control: AbstractControl) {
      let emailRegex = new RegExp(`^[_A-Za-z0-9-]+(?:\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*(?:\.[A-Za-z]{2,4})$`);
      return emailRegex.test(control.value) ?
          null :
          { 'validEmail': false};
  }  


  static ukPhoneValidator(control: AbstractControl) {
    let phoneNumber = control.value || '';
    let ukPhoneRegex = new RegExp(`^(?:(?:\\(?(?:0(?:0|11)\\)?[\\s-]?\\(?|\\+)44\\)?[\\s-]?(?:\\(?0\\)?[\\s-]?)?)|(?:\\(?0))(?:(?:\\d{5}\\)?[\\s-]?\\d{4,5})|(?:\\d{4}\\)?[\\s-]?(?:\\d{5}|\\d{3}[\\s-]?\\d{3}))|(?:\\d{3}\\)?[\\s-]?\\d{3}[\\s-]?\\d{3,4})|(?:\\d{2}\\)?[\\s-]?\\d{4}[\\s-]?\\d{4}))(?:[\\s-]?(?:x|ext\\.?|\\#)\\d{3,4})?$`)
      return ukPhoneRegex.test(phoneNumber.replace(/ /g,'')) ?
          null :
          { 'ukPhone': false};
  }  
}