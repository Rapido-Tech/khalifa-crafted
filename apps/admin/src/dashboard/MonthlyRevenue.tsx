import { CardWithIcon } from "./CardWithIcon";

interface Props {
  value?: string;
}

const MonthlyRevenue = (props: Props) => {
  const { value } = props;

  return (
    <CardWithIcon to="/orders" title={"Monthly revenue"} subtitle={value} />
  );
};

export default MonthlyRevenue;
