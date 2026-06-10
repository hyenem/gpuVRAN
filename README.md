# GPU vRAN 학습 노트

GPU 아키텍처와 CUDA를 기초부터 배워 **GPU 기반 vRAN(5G L1/PHY) 가속**까지 연결하는 개인 학습 사이트입니다.

🔗 **사이트 보기:** (배포 후 여기에 GitHub Pages URL이 들어갑니다)

## 구성

| Part | 내용 |
|------|------|
| **Part 1 · GPU 아키텍처** | CPU vs GPU, SIMT·Warp·SM, 메모리 계층, 최신 아키텍처 |
| **Part 2 · CUDA** | 프로그래밍 모델, 첫 커널, 메모리 관리, 스트림, 성능 최적화 |
| **Part 3 · GPU vRAN** | vRAN/O-RAN 기초, L1/PHY 가속 블록(LDPC·FFT·빔포밍), NVIDIA Aerial(cuPHY), 실시간 제약 |

## 로컬에서 보기

순수 정적 HTML이라 빌드가 필요 없습니다. 그냥 열거나 간단한 서버로:

```bash
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000
```

## 기술

- 순수 HTML/CSS/JS (의존성·빌드 없음)
- 반응형 사이드바, 코드 하이라이팅, 다크 테마

---
개인 학습용 노트입니다. 실제 개발 시 [CUDA 공식 문서](https://docs.nvidia.com/cuda/)와 [NVIDIA Aerial](https://developer.nvidia.com/aerial)을 함께 참고하세요.
