import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { ProjectInvitesService } from './project-invites.service';


describe('Projects-InvitesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectInvitesService = TestBed.get(ProjectInvitesService);
    expect(service).toBeTruthy();
  });
});
