import styled from "styled-components";

const desktopStartWidth = 996;

export const desktop = `@media (min-width: ${desktopStartWidth}px)`;
export const mobile = `@media (max-width: ${desktopStartWidth}px)`;


export const Container = styled.div`
margin: auto;
max-width: 1200px;
width: 100%;
padding: 0px 15px 0 15px;
${mobile}{
    padding: 0px 10px 0 10px;
}
`;

export const B = styled.span`
font-weight:bold;
`;

export const U = styled.span`
text-decoration: underline;
`;

export const I = styled.span`
font-style: italic;
`;

export const Separator = styled.div`
padding: 20px;
`;

export const Wrapper = styled.div`
    padding-top: ${({ pt = 0 }) => `${pt}px`};
    padding-bottom: ${({ pb = 0 }) => `${pb}px`};
    background-color: ${({ bg }) => bg ? bg : 'transparent'};
`;