interface SeparatorProps {
  flipped?: boolean;
}

const Separator: React.FC<SeparatorProps> = ({ flipped = false }) => {
  return (
    <div className="relative h-16">
      <div
        className={`absolute inset-0 w-full ${flipped ? 'transform rotate-180' : ''}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='1' d='M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,202.7C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
    </div>
  );
};

export default Separator;