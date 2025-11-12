interface DontVoocProps {
  shouldShow: boolean;
}

export const DontVooc = ({ shouldShow }: DontVoocProps) => {
  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <img
        src="/fnaf.gif"
        alt="FNAF"
        className="w-full h-full object-cover"
        style={{
          maxWidth: "100vw",
          maxHeight: "100vh",
          objectFit: "contain",
        }}
      />
    </div>
  );
};
