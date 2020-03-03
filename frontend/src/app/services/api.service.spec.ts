import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ApiService
			]
		});
	});
	
	it('should it test Api', inject([ApiService], (service: ApiService) => {
		expect(service).toBeTruthy();
	}));
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: ApiService = TestBed.get(ApiService);
		expect(service).toBeTruthy();
	});

	// it('testing function getTodosAll()', ()=>{

	// });
});
