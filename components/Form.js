import styled from "styled-components";

export default function Form() {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    await onSubmit(data);
    event.target.reset();
  }

  return (
    
  )
}
