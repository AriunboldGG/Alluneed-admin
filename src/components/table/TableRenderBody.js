import TableNoData from './TableNoData';
const TableRenderBody = ({ data, children }) => {
  return data?.length > 0 ? children : <TableNoData isNotFound={!data?.length > 0} />;
};
export default TableRenderBody;
