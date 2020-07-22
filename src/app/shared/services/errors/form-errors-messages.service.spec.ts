import { TestBed } from '@angular/core/testing';

import { FormErrorsMessagesService } from './form-errors-messages.service';

describe('FormErrorsMessagesService', () => {
  let service: FormErrorsMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormErrorsMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
