# GPU·CUDA 학습 노트

GPU 아키텍처, CUDA 프로그래밍과 동작 방식, 그리고 스케줄링을 기초부터 깊게 정리한 학습 사이트입니다.

🔗 **사이트 보기:** https://hyenem.github.io/gpuVRAN/

## 구성

| 장 | 내용 |
|----|------|
| **① GPU 아키텍처** | CPU vs GPU, SM 내부 구조, SIMT·warp, 메모리 계층, occupancy, compute capability |
| **② CUDA 프로그래밍** | grid/block/thread 모델, 첫 커널, 2D 그리드·grid-stride loop, 메모리 관리, 동기화, nvcc 컴파일 |
| **③ 실행 모델** | 커널 launch의 실체, 비동기·스트림(기본 스트림의 함정), 이벤트, 블록→SM 배정 |
| **④ 스케줄링** | warp 스케줄링, occupancy 튜닝, 스트림 우선순위, 선점, time-slicing·MIG·MPS |
| **⑤ CUDA Graphs** | 3단계 동작, stream capture, 업데이트, conditional node, device launch |
| **⑥ 성능 최적화** | roofline 병목 진단, 메모리 병합, 타일링, bank conflict, warp 셔플 reduction, 프로파일링 |

## 로컬에서 보기

순수 정적 HTML이라 빌드가 필요 없습니다:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## 기술

- 순수 HTML/CSS/JS (의존성·빌드 없음), 사이트 전체 검색, 다크 테마
- 코드 복사 버튼, 키보드 단축키: `/` 검색 포커스, `←`/`→` 이전·다음 장 이동

---
개인 학습용 노트입니다. 정확성은 [CUDA 공식 문서](https://docs.nvidia.com/cuda/)를 함께 참고하세요.
