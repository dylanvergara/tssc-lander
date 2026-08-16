import BeehiivForm from '../../components/BeehiivForm';

export default function TwoPieceTuesdayPage() {
  return (
    <div className="tpt-page">
      <img
        src="/images/2PT (1).png"
        alt="Two-Piece Tuesday"
        className="tpt-image"
      />
      <img
        src="/images/2PT.png"
        alt="Two-Piece Tuesday Newsletter Preview"
        className="tpt-image"
      />
      <div className="tpt-form-wrap">
        <BeehiivForm formId="eadf2cfa-487e-4dc2-b023-07a7eecb02b3" />
      </div>
    </div>
  );
}
