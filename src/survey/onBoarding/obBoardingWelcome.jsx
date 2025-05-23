

export default function WelcomeInstructions({ imageName } ) {
  return (
    <div className="overflow-hidden rounded-md flex flex-col items-center justify-center text-center h-[60vh]">
      <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-950">
        Aviso
      </h2>
      <img
        src={`/images/${imageName}.png`}
        alt="ID Icon"
        className="my-6 w-1/2 object-contain"
      />
      <p className="text-base pt-6">
        Por favor escanee su documento de identidad.
        <br />
        Cuando esté listo, oprima <strong>"Escanear"</strong>.
      </p>
    </div>
  );
}
