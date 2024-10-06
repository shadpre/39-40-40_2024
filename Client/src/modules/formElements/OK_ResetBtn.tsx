export default function OK_ResetBtn(): JSX.Element {
  return (
    <div className="form-control flex ">
      <button type="submit" className="btn btn-primary m-2">
        Opret
      </button>
      <button type="reset" className="btn btn-secondary m-2">
        Reset
      </button>
    </div>
  );
}
