import styled from 'styled-components';
import { IoMdAddCircle } from "react-icons/io";
import { colors } from '../../components/Layout/styles/variables';


export const CalendarDaysHead = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
div{
    text-align: center;
}
`;
export const CalendarDays = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

export const AddBtn = styled(IoMdAddCircle)`
position: absolute;
top: 0 ;
right: 0;
font-size: 1.3rem;
color:${colors.primary};
cursor: pointer;
`;

export const Day = styled.div`
cursor: pointer;
height:70px;
border: 1px solid #000;
transition: 0.5s;
text-align: center;
position: relative;
background-color: ${({ isactive }) => isactive ? 'green' : '#f1f1f1'};
&:hover{
    background-color: #f1f1f1;
}
`;
