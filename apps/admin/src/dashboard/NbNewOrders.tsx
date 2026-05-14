import CardWithIcon from "./CardWithIcon";

interface Props {
  value?: number;
}

const NbNewOrders = (props: Props) => {
  const { value } = props;

  return <CardWithIcon to="/orders" title={"New orders"} subtitle={value} />;
};

export default NbNewOrders;
