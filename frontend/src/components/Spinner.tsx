import { ClipLoader } from "react-spinners";

interface Props {
  loading: boolean;
}

const override = {
  display: "block",
  margin: "100px auto",
};

function Spinner({ loading }: Props) {
  return (
    <ClipLoader
      color="#4338ca"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default Spinner;
