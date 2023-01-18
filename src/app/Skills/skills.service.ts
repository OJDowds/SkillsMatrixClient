import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, of } from "rxjs";
import { catchError, tap, map} from 'rxjs/operators';
import { Skill } from "./skill";

@Injectable({
    providedIn: 'root'
})


export class SkillsService {
    private skillsUrl = 'api/skills';

    constructor(private http: HttpClient) {}

    getSkills(): Observable<Skill[]> {
        return this.http.get<Skill[]>(this.skillsUrl) .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
        );
    }

    getSkill(id: number): Observable<Skill> {
        if (id === 0) {
          return of(this.initializeSkill());
        }
        const url = `${this.skillsUrl}/${id}`;
        return this.http.get<Skill>(url)
          .pipe(
            tap(data => console.log('getSkill: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
    }
        
    // createUserSkill(userSkill : UserSkill): Observable<UserSkill> {}

    // editUserSkill(userSkill : UserSkill): Observable<UserSkill> {}

    // deleteUserSkill(userSkill : UserSkill): Observable<UserSkill> {}

    createSkill(skill: Skill): Observable<Skill> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        skill.id = 0;
        return this.http.post<Skill>(this.skillsUrl, skill, { headers })
          .pipe(
            tap(data => console.log('createSkill: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
      }
    
      deleteSkill(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.skillsUrl}/${id}`;
        return this.http.delete<Skill>(url, { headers })
          .pipe(
            tap(data => console.log('deleteSkill: ' + id)),
            catchError(this.handleError)
          );
      }
    
      updateSkill(skill: Skill): Observable<Skill> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.skillsUrl}/${skill.id}`;
        return this.http.put<Skill>(url, skill, { headers })
          .pipe(
            tap(() => console.log('updateSkill: ' + skill.id)),
            // Return the skill on an update
            map(() => skill),
            catchError(this.handleError)
          );
      }

    private handleError(err: HttpErrorResponse):  Observable<never> {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(()=>errorMessage);
    }


    private initializeSkill(): Skill {
        // Return an initialized object
        return {
            id: 0,
            skillUserName: '',
            skillName: '',
            skillCode: '',
            skillLevel: 0,
            skillCategory: ''
        };
      }

}