import CardNoData from './CardNoData';

const CardRenderBody = ({ data, children }) => {
    return data?.length > 0 ? children : <CardNoData />;
};
export default CardRenderBody;
