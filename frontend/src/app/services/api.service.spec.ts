import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ApiService]
		})
		const apiService = TestBed.get(ApiService)
	});

	it('should it test Api', inject([ApiService], (service: ApiService) => {
		expect(service).toBeTruthy();
	}));
	

	// it('should be created', () => {
	// 	const service: ApiService = TestBed.get(ApiService);
	// 	expect(service).toBeTruthy();
	// });

	// it('testing function getTodosAll()', ()=>{

	// });
});
