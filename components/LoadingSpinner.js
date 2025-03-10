import styled from "styled-components";

const SpinnerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8); /* Light overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Ensures spinner is above other content */
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-left-color: #024b3b;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function LoadingSpinner() {
  return (
    <SpinnerOverlay>
      <Spinner />
    </SpinnerOverlay>
  );
}
