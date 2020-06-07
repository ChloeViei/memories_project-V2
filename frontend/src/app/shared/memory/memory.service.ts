import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Memory } from './memory.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class MemoryService {
  selectedMemory: Memory;
  memories: Memory[];

  constructor(private http: HttpClient) { }

  postMemory(mem: Memory) {
    return this.http.post(environment.apiBaseUrl + '/registermemory', mem);
  }

  getMemoryList() {
    return this.http.get(environment.apiBaseUrl + '/memories');
  }

  putMemory(mem: Memory) {
    return this.http.put(environment.apiBaseUrl + '/${mem._id}', mem);
  }

  deleteMemory(_id: string) {
    return this.http.delete(environment.apiBaseUrl + '/${_id}');
  }

}
