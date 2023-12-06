import { Test, TestingModule } from '@nestjs/testing';
import { DiaryDraftService } from './diary-draft.service';

describe('DiaryDraftService', () => {
  let service: DiaryDraftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiaryDraftService],
    }).compile();

    service = module.get<DiaryDraftService>(DiaryDraftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
