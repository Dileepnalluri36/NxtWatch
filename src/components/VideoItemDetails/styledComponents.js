import styled from 'styled-components'

export const VideoItemDetailsContainer = styled.div`
  background-color: ${props => (props.isLight ? '#f9f9f9 ' : '#0f0f0f ')};
  height: 100%;
  overflow: auto;
`
