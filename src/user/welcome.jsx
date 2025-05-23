import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

export default function WelcomeContent() {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="mx-auto flex flex-col items-center px-6 lg:px-8">
        <div className="lg:text-center lg:w-7/12">
          <h2 className="text-base/7 font-semibold text-indigo-600">
            Visibilizando Comunidades
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Iniciativa Afrocolombiana en Caldas
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Un esfuerzo para destacar las realidades y tradiciones de las
            comunidades afrocolombianas en Caldas, promoviendo su inclusión y
            reconocimiento.
          </p>
        </div>

        <div className="mx-auto mt-10 w-full h-20 bg-[url('/wallpaper2.jpg')] bg-repeat-x bg-top rounded-xl my-16"></div>

        <div className="lg:w-7/12">
          <p>
            Esta iniciativa busca realizar un levantamiento de información sobre
            las organizaciones afrocolombianas distribuidas a lo largo de
            Caldas, Colombia. Nuestro objetivo es recopilar datos clave que
            permitan hacer más visibles y accesibles las realidades de estas
            comunidades tanto para el gobierno como para el público en general.
          </p>
          <ul role="list" className="mt-8 space-y-8 text-gray-600 lg:w-1/2">
            <li className="flex gap-x-3">
              <CloudArrowUpIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-indigo-600"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Recopilación de datos.
                </strong>{" "}
                Documentamos la estructura y actividades de las organizaciones
                afrocolombianas en Caldas para darles mayor visibilidad.
              </span>
            </li>
            <li className="flex gap-x-3">
              <LockClosedIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-indigo-600"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Promoción cultural.
                </strong>{" "}
                Resaltamos las tradiciones como el currulao y la riqueza
                cultural de las comunidades afrocolombianas.
              </span>
            </li>
            <li className="flex gap-x-3">
              <ServerIcon
                aria-hidden="true"
                className="mt-1 size-5 flex-none text-indigo-600"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Conexión con el gobierno.
                </strong>{" "}
                Facilitamos que las realidades de estas comunidades sean
                accesibles para políticas públicas más inclusivas.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            A través de este esfuerzo, queremos destacar los desafíos que
            enfrentan estas comunidades, así como su contribución al tejido
            social y cultural de Caldas. La región, conocida por sus montañas y
            cultivos de café, también es un hogar vibrante para las tradiciones
            afrocolombianas que merecen ser reconocidas.
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            ¿Sin visibilidad? No más.
          </h2>
          <p className="mt-6">
            Nuestro trabajo está enfocado en dar voz a las comunidades
            afrocolombianas, asegurándonos de que sus historias, tradiciones y
            necesidades sean escuchadas. Únete a nosotros para construir un
            futuro más inclusivo y equitativo para todos en Caldas.
          </p>
        </div>
      </div>
    </div>
  );
}
