-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 05-07-2024 a las 12:20:47
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `animepage`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animes`
--

CREATE TABLE `animes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(1500) NOT NULL,
  `portada` varchar(250) NOT NULL,
  `portadaprincipal` varchar(250) DEFAULT NULL,
  `trailerprincipal` varchar(1000) NOT NULL,
  `anio` int(11) NOT NULL,
  `enemision` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `animes`
--

INSERT INTO `animes` (`id`, `nombre`, `descripcion`, `portada`, `portadaprincipal`, `trailerprincipal`, `anio`, `enemision`) VALUES
(1, 'Arcane', 'Arcane es una serie animada que se desarrolla en el universo de \"League of Legends\". La trama sigue a dos hermanas, Vi y Powder, mientras enfrentan desafíos en la ciudad de Piltover y la peligrosa Zaun. La serie explora temas de magia, tecnología y relaciones personales en un entorno distópico.', 'arcanecard.jpeg', 'arcane-lol.jpg', 'https://www.youtube.com/embed/fXmAurh012s?si=uZKJmSfX523LGho8', 2021, 1),
(2, 'Frieren: Más allá del final del viaje', 'La maga Frieren formaba parte del grupo del héroe Himmel, quienes derrotaron al Rey Demonio tras un viaje de 10 años y devolvieron la paz al reino. Frieren es una elfa de más de mil años de vida, así que al despedirse de Himmel y sus compañeros promete que regresará para verlos y parte de viaje sola. Al cabo de cincuenta años, Frieren cumple su promesa y acude a visitar a Himmel y al resto. Aunque ella no ha cambiado, Himmel y los demás han envejecido y están en el final de sus vidas. Cuando Him', 'frierencard.jpe', NULL, 'https://www.youtube.com/embed/Iwr1aLEDpe4?si=eXn75uaCdD2oM_ID', 2023, 0),
(3, 'JUJUTSU KAISEN', 'JUJUTSU KAISEN es un manga con historia y dibujo de Gege Akutami que se publica en la Weekly Shonen Jump. Poco después de su debut se estrenaba la adaptación animada, producida por Studio MAPPA. Actualmente hay varias temporadas del anime, comenzando con la primera (24 episodios), siguiéndole la aclamada película precuela JUJUTSU KAISEN 0, y posteriormente la segunda temporada en julio de 2023. La serie está disponible subtitulada y doblada.\r\n\r\n¡Sigue al joven Yuji Itadori en esta serie de acción sobrenatural mientras entrena como hechicero y explora el violento mundo de las maldiciones!\r\n\r\nYuji Itadori se traga un dedo maldito para salvar a alguien de su clase y ahora Ryomen Sukuna, un poderoso hechicero malvado conocido como el Rey de las Maldiciones, vive en su alma. Las maldiciones son seres sobrenaturales creadas a partir de las emociones negativas de los humanos. Esta energía maldita puede usarse como fuente de poder por parte de los hechiceros y de los espíritus malditos.\r\n\r\nGuiado por los hechiceros, Yuji Itadori se une a la Escuela de Bachillerato Técnico de Brujería de Tokio, una organización que enfrenta a las maldiciones. Con la ayuda de su maestro, Satoru Gojo, Itadori hace amistad con Megumi Fushiguro y Nobara Kugisaki, ambos estudiantes de primer año como él.', 'jujutsukaisencard.jpe', 'JujutsuKaisen.jpg', 'https://www.youtube.com/embed/pkKu9hLT-t8?si=JkC8L0uvGv162ECW', 2020, 1),
(4, 'Cyberpunk: Edgerunners', 'En una realidad distópica repleta de corrupción e implantes cibernéticos, un joven talentoso e impulsivo intenta convertirse en un mercenario.', 'cyberpunkedgerunnerscard.jpg', NULL, 'https://www.youtube.com/embed/JtqIas3bYhg?si=Zcpizz1_QkP3O9ef', 2022, 0),
(5, 'Attack on Titan', 'Muchos años atrás, la humanidad estuvo al borde de la extinción con la aparición de unas criaturas gigantes que devoraban a todas las personas. Huyendo, la humanidad consiguió sobrevivir en una ciudad fortificada de altas murallas que se ha convertido en el último reducto de la civilización contra los Titanes que campan a sus anchas por el mundo. Ahora esa paz está a punto de verse interrumpida por una cadena de acontecimientos que llevará a desvelar qué son los Titanes y cómo aparecieron.', 'attackontitancard.jpe', NULL, 'https://www.youtube.com/embed/MGRm4IzK1SQ?si=_bBMcDgvoYAyvvF3', 2013, 0),
(6, 'Erased', 'Erased (Desaparecida) es una serie de ciencia ficción que cuenta la historia de Satory Fujinuma, un autor de manga sin mucho éxito que sufre de un peculiar fenómeno conocido como Resucitación en el cual se transporta a la fuerza atrás en el tiempo hasta el momento anterior de que ocurra algo que supone un peligro para una vida. Satoru no tarda en descubrir que el fenómeno persiste hasta que la causa de la amenaza desaparece.', 'erasedcard.jpe', NULL, 'https://www.youtube.com/embed/g8tTxuO1oIY?si=AvuK0WE2SFeSqUVx', 2016, 0),
(7, 'Solo Leveling', 'Lo que no te mata te hace más fuerte, pero en el caso de Sung Jinwoo, lo que lo mató lo hizo más fuerte. Después de ser brutalmente asesinado por monstruos en una mazmorra de alto rango, Jinwoo regresó con el Sistema, un programa que solo él puede ver y que eleva su nivel en todos los sentidos. Ahora, está decidido a descubrir los secretos detrás de sus poderes y la mazmorra que los engendró.', 'sololevelingcard.jpe', 'SoloLeveling.jpg', 'https://www.youtube.com/embed/YvGSK8mIlt8?si=1H-FF8WgbKg5lK6_', 2024, 1),
(8, 'Death Note', 'Light Yagami es un estudiante brillante con mucho futuro que se aburre a más no poder. Pero todo cambia cuando encuentra la Death Note, un cuaderno que dejó caer un rebelde dios de la muerte.', 'deathnotecard.jpe', NULL, 'https://www.youtube.com/embed/Amag3NrjBc0?si=MDO791a_sx48EMLe', 2006, 0),
(9, 'Fullmetal Alchemist: Brotherhood', 'Los hermanos Elric rompieron uno de los más importantes tabúes de la alquimia, de modo que Ed perdió casi la mitad de su cuerpo, ahora reemplazado por partes mecánicas, y su hermano menor Al, quedó convertido en un alma ligada a una armadura. Ambos buscarán la forma de recuperar sus cuerpos, resolver uno de los grandes misterios de la alquimia y recuperar a su madre.', 'fullmetalcard.jpe', NULL, 'https://www.youtube.com/embed/kx0nBaS_q50?si=JsvFKTyGgJ7P6bal', 2009, 0),
(10, 'Demon Slayer: Kimetsu no Yaiba', 'Estamos en la era Taisho de Japón. Tanjiro, un joven que se gana la vida vendiendo carbón, descubre un día que su familia ha sido asesinada por un demonio. Para empeorar las cosas, su hermana menor Nezuko, la única superviviente de la masacre, ha sufrido una transformación en demonio.\r\n\r\nDestrozado por los acontecimientos Tanjiro decide convertirse en un cazador de demonios para poder devolver a su hermana a la normalidad y matar al demonio que masacró a su familia.', 'demonslayercard.jpe', NULL, 'https://www.youtube.com/embed/VQGCKyvzIM4?si=0CIyB7tMQCldOHac', 2019, 0),
(11, 'Naruto Shippuden', 'Naruto quiere ser el mejor ninja en la tierra. La acción comienza tras los dos años y medio que el protagonista, Naruto Uzumaki, ha pasado entrenando con su maestro Jiraiya. En ella reaparecen todos los personajes de la serie anterior pero con más experiencia y fuerza. Además, la Organización Akatsuki entra en acción, tras su breve aparición en la parte anterior, y se revelan sus objetivos.', 'narutoshippudencard.jpg', NULL, 'https://www.youtube.com/embed/yKELA1qBAKA?si=p2kc8oiRjrggqU0j', 2007, 0),
(12, 'Chainsaw Man', 'Denji es un adolescente que vive con un demonio motosierra llamado Pochita. Para pagar la deuda que le dejó su padre tras su muerte, ha tenido que ganarse el pan como puede matando demonios y vendiendo sus cadáverse a la mafia, aunque su vida siempre ha sido miserable.\r\n\r\nCuando una traición provoca la muerte de Denji, Pochita hace un contrato con él y Denji revive como \"Chainsaw Man\", un ser humano con el corazón de un demonio.', 'chainsawmancard.jpe', NULL, 'https://www.youtube.com/embed/K9Gnl0VeIVI?si=y-gXcT_q_qUryM1L', 2022, 0),
(13, 'Berserk', 'Guts es un espadachín solitario que porta en su espalda dos cosas: una absurdamente enorme y burda espada, y una cruel y dura historia. En un mundo en el que la guerra, las montañas de cadáveres y la desdicha son la moneda común, el mal que acecha es cada vez más poderoso. Solo Guts se interpone en su camino con dureza y sangre fría, aunque de la triste historia de su vida ahora no queda más que una marca y una gran sed de venganza.', 'berserkcard.jpe', NULL, 'https://www.youtube.com/embed/odIwkGztmcc?si=kl2r0GhW-qmN4mCq', 1997, 0),
(14, 'Dragon Ball Z', 'Villanos terroríficamente malvados de los rincones más oscuros del espacio y el tiempo se enfrentan con la Tierra, y Goku, el guerrero más fuerte del planeta, es todo lo que se interpone entre la humanidad y la extinción. Acompañado en la batalla por los valientes Guerreros Z, Goku viaja a reinos lejanos y peligrosos en busca de los poderes mágicos de las siete Dragon Balls... ¡y de una buena pelea!', 'dragonballzcard.jpe', NULL, 'https://www.youtube.com/embed/ol7_oTEdy_Q?si=WQ-9B2PTOWgetlxs', 1989, 0),
(15, 'One Piece', 'Monkey D. Luffy se niega a que nadie se interponga en su camino para convertirse en Rey de los Piratas. Se lanza a surcar los mares y se convertirá en un capitán dispuesto a no darse por vencido jamás hasta hacerse con el mayor tesoro de la historia: el legendario One Piece.', 'onepiececard.jpe', NULL, 'https://www.youtube.com/embed/LHTYpWI3S6Q?si=DeFcQw16l1vZ6Axt', 1999, 1),
(16, 'BLUELOCK', 'Yoichi es un joven al que acaban de eliminar junto a su equipo. De pronto recibe una carta donde lo convocan para participar en un extraño experimento sobre fútbol.', 'bluelockcard.jpe', NULL, 'https://www.youtube.com/embed/0bR8i-__Jtg?si=ygjxqE-_8mWfk5CE', 2024, 1),
(17, 'SPY x FAMILY', 'Todo el mundo tiene una parte de sí mismos que no puede mostrar a los demás.\r\n\r\nEn una era en la que las naciones de todo el mundo se encuentran involucradas en una feroz guerra de información a puerta cerrada, Ostania y Westalis llevan décadas en guerra fría.\r\n\r\nLa División de Inteligencia de Westalis (WISE) envía a su mejor espía, \"Twilight\", en una misión ultrasecreta para vigilar los movimientos de Donovan Desmond, quien dirige el Partido Nacional por la Unidad de Ostania, responsable de bombardear los esfuerzos de paz entre ambos países.', 'spyxfamilycard.jpe', NULL, 'https://www.youtube.com/embed/ofXigq9aIpo?si=nnph4oiqJusm1o5Z', 2022, 0),
(18, 'The Unwanted Undead Adventurer', 'Rentt Faina se ha pasado los últimos diez años cazando monstruos. Por desgracia, no se le da muy bien su trabajo y se ve atrapado por la rutina, matando limos y goblins, solo por unas pocas monedas al día. Sin embargo, su suerte cambia cuando, un día, encuentra un nuevo camino sin descubrir. Al final del camino se encuentra con un dragón legendario y muere, pero se despierta convertido en un saco de huesos no muerto. En su nueva vida, se propone luchar y subir de nivel para poder regresar, algún día, al mundo de los vivos.', 'theunwantedadventurercard.jpe', NULL, 'https://www.youtube.com/embed/iaYgDqydDoI?si=a1V2oK3f1BBJ15WI', 2024, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animes_generos`
--

CREATE TABLE `animes_generos` (
  `anime_id` int(11) NOT NULL,
  `genero_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `animes_generos`
--

INSERT INTO `animes_generos` (`anime_id`, `genero_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(2, 3),
(3, 4),
(3, 5),
(3, 6),
(4, 1),
(4, 2),
(4, 4),
(4, 7),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(5, 7),
(6, 2),
(6, 7),
(7, 1),
(7, 3),
(7, 4),
(8, 6),
(8, 7),
(9, 1),
(9, 2),
(9, 3),
(9, 4),
(9, 5),
(9, 7),
(10, 3),
(10, 4),
(10, 5),
(11, 1),
(11, 3),
(11, 4),
(11, 10),
(12, 4),
(12, 5),
(12, 6),
(13, 3),
(13, 4),
(13, 6),
(13, 8),
(14, 1),
(14, 4),
(14, 5),
(15, 1),
(15, 3),
(15, 4),
(15, 5),
(16, 2),
(16, 9),
(17, 2),
(17, 5),
(17, 10),
(18, 1),
(18, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `anime_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `valoracion` int(11) DEFAULT NULL CHECK (`valoracion` >= 0 and `valoracion` <= 5),
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `anime_id`, `usuario_id`, `comentario`, `valoracion`, `fecha`) VALUES
(1, 1, 8, 'hola xD', 5, '2024-07-05 09:26:06'),
(2, 1, 9, 'Muy buen anime che, recomendado la verdad', 5, '2024-07-05 10:04:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `episodios`
--

CREATE TABLE `episodios` (
  `id` int(11) NOT NULL,
  `anime_id` int(11) NOT NULL,
  `temporada` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `imagencapitulo` varchar(1000) NOT NULL,
  `linkcapitulo` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `episodios`
--

INSERT INTO `episodios` (`id`, `anime_id`, `temporada`, `nombre`, `descripcion`, `imagencapitulo`, `linkcapitulo`) VALUES
(1, 1, 1, '1. ¡Bienvenidos!', 'Las hermanas huérfanas Vi y Powder causan problemas en las calles clandestinas de Zaun tras un robo en la lujosa ciudad de Piltóver.', 'https://occ-0-2442-185.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABboqUbFzIthWGiSJjoGOXxGy7jZPKFJlUAHuceiLEY7dqwNY9PIDzrcN2O8HqSqybFCSG7VAtUdAJU9wf36pbCvHms0dc5NK9Ru4pAiL4b7qdcZFOG2iXEv_.jpg?r=4bd', ''),
(2, 1, 1, '2. Algunos misterios están mejor sin resolver', 'El idealista inventor Jayce intenta dominar la magia con la ciencia, a pesar de los consejos de su mentor. El líder criminal Silco experimenta con una poderosa sustancia.', 'https://occ-0-2442-185.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABY9LebHXOUR4p4PCtt4U0DNKqxlTZVdfUOfkfC8VUcVK3na3shy_tlqMXlqZdFbw-WVrfdxLnejnQKBvea8-_QV6vJPGfBvBo_KCt8kQFN9XlVDyApd6mSai.jpg?r=e7f', ''),
(3, 1, 1, '3. La violencia bruta es necesaria para el cambio', 'Un enfrentamiento épico entre viejos rivales trae graves consecuencias para la localidad de Zaun. Jayce y Viktor lo arriesgan todo por su investigación.', 'https://occ-0-2442-185.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABU1PrCiA5qQM_wkEMtve1fJJOtwuiIcAWuSzpSOU-X8nCyaWmqJEp7JQRtBTU9xdIdqNOLhUi7IohlfVDsX8fjA70_DLLmqtCs0YvFxkYj8np6D2ubHdoJWg.jpg?r=2fb', ''),
(4, 1, 1, '4. ¡Feliz Día del Progreso!', 'Ya que Piltóver se está beneficiando de su tecnología, Jayce y Viktor piensan en el siguiente paso. Una cara familiar de Zaun reaparece y provoca un caos.', 'https://occ-0-2442-185.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABdm-rgpTdVeZmz4m24wvIUTZTGqGI2SL7-MBDwkk_99AsxqpBSf1EYLg4Q8KaReOzBA-pDCtUstJjNhTac6K08_FXJMUCfcuWjzQlnvIcYvjUSUhogaXUkER.jpg?r=7e8', ''),
(5, 1, 1, '5. Todo el mundo quiere ser mi enemigo', 'La rebelde vigilante Caitlyn recorre el distrito suburbano para localizar a Silco. Jayce se convierte en un blanco al intentar erradicar la corrupción en Piltóver.', 'https://occ-0-2442-185.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABbT-_85D1Bh3qNJlysa_jre7S5oXSX821pGbFjm79mKEmfKnmVRIkH_7_mx_dShgzwO5dvbebhgTR_ahlCQoBCYQwYDO_P73c8dbfrUOk5Blx4h0ySbuY6z6.jpg?r=4c8', ''),
(6, 1, 1, '6. Cuando caigan estos muros', 'Un protegido menoscaba a su tutor en el Consejo, mientras una tecnología mágica evoluciona rápidamente. Con las autoridades detrás de ella, Jinx debe afrontar su pasado.', 'https://occ-0-2442-185.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABSLcwMMW1NLtJlrSJsR8UWNJRdCijC3pYCNTuCbYIuRP0H_omD6dFTgc-tGqoNpMVDWaod8B4bK8d8Feqgx4ilLl4hxe3LhGc316HRqd4f9TUos-oOvQqO4O.jpg?r=bd5', ''),
(7, 1, 1, '7. El salvador', 'Caitlyn y Vi se reúnen en un callejón de Zaun y se dirigen hacia una frenética pelea con una enemiga en común. Viktor toma una complicada decisión.', 'https://occ-0-2442-185.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABZZBYlcMfmyrGiOFFtSyWwFAJ2wTDGqAcrLyLG2cqnhsvEa6BxdPaNtyJt8Gx_qJ3ib3c-uFRIrx6HN6BXjzSOYR99GUXh8sCYKsjsaRK0t2RLdPZO7w0IhK.jpg?r=f87', ''),
(8, 1, 1, '8. Agua y aceite', 'La desterrada heredera Mel y su madre, que está de visita, intercambian tácticas de combate. Caitlyn y Vi forman una inesperada alianza. Jinx tiene un cambio impactante.', 'https://occ-0-2442-185.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABUbDh2rfCP9meVzPd7lyvODAikLObA5InThhqCbmh1oP_qvq4SE6QTrOdzCbLpKPI7NzFZW1BQwhJOg9uzBgiWykFKgwhKyajAPyuU90Y3gvBT3jPjukCfAB.jpg?r=9ff', ''),
(9, 1, 1, '9. El monstruo que creaste', 'Cuando la guerra acecha peligrosamente, los líderes de Piltóver y Zaun reciben un ultimátum. Pero un enfrentamiento fatídico cambia ambas ciudades para siempre.', 'https://occ-0-2442-185.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABaaTH50NeyX0C0jzlxr7Kbf8J-r51oJ2JxhPAu5FnGBfIsB-hidE2A-BzEadsB6Gdj4qnFa8LamRsP0piWMqJ3HU-w9lUU4sCXoDlDydYhhNg4pDvSagybI2.jpg?r=abb', ''),
(10, 2, 1, 'E1 - El fin de la aventura', 'El grupo del Héroe ha derrotado al Rey Demonio y sus miembros se separan para seguir con sus vidas, aunque entre ellos está Frieren, la elfa maga, cuya vida será mucho más larga que las de sus compañeros.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/0a540e01e5d00a998a241d1ea23181ad.jpe', 'https://www.crunchyroll.com/es/watch/G0DUND0K2/the-journeys-end'),
(11, 2, 1, 'E2 - No tiene que ser magia...', 'Frieren acude a visitar al sacerdote Heiter y ayuda a entrenar a Fern, su discípula, aunque le pide algo muy particular con respecto a ella.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/747ed837208f39c176f3bf2b21e619cf.jpe', 'https://www.crunchyroll.com/es/watch/GEVUZXG7J/it-didnt-have-to-be-magic'),
(14, 2, 1, 'E3 - Magia asesina', 'Frieren y Fern se separan para ir de compras. Curiosa por el comportamiento sospechoso de su maestra, Fern decide seguir a Frieren a escondidas.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/f5297f95ee0122d9fa2338bc02e2f084.jpe', 'https://www.crunchyroll.com/es/watch/G7PU4MV72/killing-magic'),
(15, 2, 1, 'E4 - La Tierra donde descansan las Almas', 'Frieren y Fern ayudan a limpiar la costa. Frieren se reencuentra con Eisen, que le hace una petición.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/be41aa39b17e6af8505008be17704fc2.jpe', 'https://www.crunchyroll.com/es/watch/G9DUE5P02/the-land-where-souls-rest'),
(16, 2, 1, 'E5 - Espectros de los difuntos', 'Antes de cruzar las montañas, Frieren y Fern oyen el rumor de que unos fantasmas están atacando a la gente de la zona. Fern decide ayudar.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/5511652dd902e2c68713a059d7952468.jpe', 'https://www.crunchyroll.com/es/watch/G9DUE57Z2/phantoms-of-the-dead'),
(17, 2, 1, 'E6 - El héroe del pueblo', 'Stark decide colaborar con Frieren y Fern para derrotar al dragón que acecha al pueblo. El aprendiz de Eisen muestra su determinación.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/8f58dbe3742e24df5cfcb34e966343cb.jpe', 'https://www.crunchyroll.com/es/series/GG5H5XQX4/frieren-beyond-journeys-end'),
(18, 3, 1, 'E1 - Ryomen Sukuna', 'Yuuji es un joven que posee un talismán muy poderoso y él ni siquiera es consciente de ello. Pero un día se topa con Fushiguro y su vida dará un cambio radical.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/a8f5d6cd0f0c23c8c6be1935b2b3ebe2.jpe', 'https://www.crunchyroll.com/es/watch/G69XGG44R/ryomen-sukuna'),
(19, 3, 1, 'E2 - Por mí', 'El hecho de comerse el dedo de Sukuna le supondrá un grave problema a Yuuji, puesto que ahora tienen que ejecutarlo. Pero tiene un modo temporal de salvarse.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/de8e2aaf2f8a1e0947287570c645ee31.jpe', 'https://www.crunchyroll.com/es/watch/G64G2V2VR/for-myself'),
(20, 3, 1, 'E3 - Chica de acero', 'Yuuji deberá demostrar que es apto para formar parte de la Preparatoria de Hechicería. Además, conocerán a la tercera integrante del equipo.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/f30887fcbc7fd381afafcc1b768e18b9.jpe', 'https://www.crunchyroll.com/es/watch/G6JK7W70R/girl-of-steel'),
(21, 3, 1, 'E4 - La existencia terrenal del Vientre Maldito', 'Los muchachos deberán partir a una misión de la que por el momento se desconoce el riesgo. Y cabe la posibilidad de que el peligro sea tremendo, mayor del que puedan manejar.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/07e4b59b3818fb74d4897a736156b08a.jpe', 'https://www.crunchyroll.com/es/watch/G6KKD9D36/curse-womb-must-die'),
(22, 3, 1, 'E5 - La existencia terrenal del Vientre Maldito II', 'Sukuna se apodera del cuerpo de Yuuji y se niega por completo a devolvérselo. Aunque sabe que tarde o temprano lo conseguirá, así que le dejará un regalo.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/524c37a1729b9d5c8ea3847e28194e3d.jpe', 'https://www.crunchyroll.com/es/watch/GYGVNN34Y/curse-womb-must-die--ii-'),
(23, 3, 1, 'E6 - Tras la lluvia', 'La situación de Yuuji pende de un hilo, y de él dependerá que consiga volver a la vida, pero ¿podrá aceptar las condiciones de Sukuna?', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/0220a3c6b7dd9ddb0bb61fd389978715.jpe', 'https://www.crunchyroll.com/es/watch/G65J225P6/after-rain'),
(24, 3, 1, 'E7 - Asalto', 'Gojou recibe una visita muy desagradable y poderosa. Pero no parece perder la calma en absoluto ante el devastador poder de su enemigo.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/c7fb95ec138af3bf4ae99484d7591a88.jpe', 'https://www.crunchyroll.com/es/watch/GY1QKKMZR/assault'),
(25, 3, 1, 'E8 - Aburrimiento', 'Antes del evento de intercambio se produce un pequeño encontronazo entre algunos de los futuros participantes.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/16298e46c642c6a60fa974c8aa99f223.jpe', 'https://www.crunchyroll.com/es/watch/GR4G22Z3Y/boredom'),
(26, 3, 1, 'E9 - Donnadies y castigo', 'Tras la masacre que se produce en el cine, Yuuji acompaña a un veterano a investigar la situación.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/dca704817ab11dc38518982f4591a588.jpe', 'https://www.crunchyroll.com/es/watch/GREMEENG6/small-fry-and-reverse-retribution'),
(27, 3, 1, 'E10 - Mutación Pasiva', 'La investigación de la masacre en el cine lleva a Yuuji a encontrarse con Junpei, el humano que se relaciona con Mahito.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/6577d3328ddf02e476ab14fd3027a9ef.jpe', 'https://www.crunchyroll.com/es/watch/GR71VVEMR/idle-transfiguration'),
(28, 3, 1, 'E11 - De mente cerrada', 'Yuuji va conociendo poco a poco a Junpei y cree que incluso podrían ser amigos. Pero se da la casualidad de que Mahito tiene otros planes.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/d4d2ddc024582047c509cec76911b912.jpe', 'https://www.crunchyroll.com/es/watch/GYEMEENPR/narrow-minded'),
(29, 3, 1, 'E12 - Para ti, algún día', 'Yuuji cree que todavía puede convencer a Junpei para que no haga una masacre en la escuela. ¿Será capaz de frenar sus ansias de sangre?', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/231f27f174d87bc865b49ac74c2f7af3.jpe', 'https://www.crunchyroll.com/es/watch/GRWMGG7J6/to-you-someday'),
(30, 3, 1, 'E13 - Hasta mañana', 'Yuuji recibe refuerzos en forma de Nanami. ¿Podrán entre los dos frenar la matanza de Mahito?', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/5c0bd5c7e36d1965d656b7029f5172b5.jpe', 'https://www.crunchyroll.com/es/watch/GY5J225GY/tomorrow'),
(31, 3, 1, 'E14 - El evento de intercambio con la escuela de Kioto -Combate grupal 0-', 'Llega el día en el que los de Tokio y los de Kioto se encuentran, aunque para desgracia de cierta persona, son los de Kioto los que acuden a Tokio. Juuji reaparece ante sus compañeros y esto desata ciertos acontecimientos.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/844131691cc76ab8eeb23f98460b0e34.jpe', 'https://www.crunchyroll.com/es/watch/G7PU45N3E/kyoto-sister-school-exchange-event---group-battle-0--'),
(32, 3, 1, 'E15 - El evento de intercambio con la escuela de Kioto -Combate grupal 1-', 'Llega el día en el que los de Tokio y los de Kioto se encuentran, aunque para desgracia de cierta persona, son los de Kioto los que acuden a Tokio. Juuji reaparece ante sus compañeros y esto desata ciertos acontecimientos.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/7a432f52f7b42b9d7405e91d06495306.jpe', 'https://www.crunchyroll.com/es/watch/G9DUEXV98/kyoto-sister-school-exchange-event---group-battle-1--'),
(33, 3, 1, 'E16 - El evento de intercambio con la escuela de Kioto -Combate grupal 2-', 'En este nuevo episodio seremos testigos de la brutal batalla entre Panda y Mechamaru.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/c7bb1d658d152abd18e3067c636dc7a0.jpe', 'https://www.crunchyroll.com/es/watch/GX9UQD830/kyoto-sister-school-exchange-event---group-battle-2--'),
(34, 3, 1, 'E17 - El evento de intercambio con la escuela de Kioto -Combate grupal 3-', 'El enfrentamiento esta vez se centrará en el combate brutal que tienen las dos hermanas Zen\'in.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/c79c56d8a0e1e2bc64eb7945343c3baf.jpe', 'https://www.crunchyroll.com/es/watch/G4VUQ34W8/kyoto-sister-school-exchange-event---group-battle-3--'),
(35, 3, 1, 'E18 - Sabios', 'El evento de intercambio sigue adelante, en teoría sin imprevistos. Pero de pronto, algo se sale de lo planeado.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/a31daf29d5273a57a884c5b8cd96d0f0.jpe', 'https://www.crunchyroll.com/es/watch/G14U43ZV9/sage'),
(36, 3, 2, 'E25 - El tesoro escondido', 'La historia nos devuelve al pasado, cuando Gojo y Geto todavía eran compañeros y no eran completos enemigos', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/cf62a54eb63cc376a41d363ff69eeb99.jpe', 'https://www.crunchyroll.com/es/watch/G0DUNJ2JP/hidden-inventory'),
(37, 3, 2, 'E26 - El tesoro escondido - Parte 2', 'Comienza la verdadera misión de Gojo y Geto, proteger a Riko como sea de todas las amenazas posibles, pero los 30 millones de recompensa son un problema.', 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/9755a10f0d50c5eb1b334b84e1c5bc50.jpe', 'https://www.crunchyroll.com/es/watch/GEVUZN7N9/hidden-inventory-2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE `generos` (
  `id` int(11) NOT NULL,
  `genero` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`id`, `genero`) VALUES
(1, 'Aventura'),
(2, 'Drama'),
(3, 'Fantasia'),
(4, 'Accion'),
(5, 'Shounen'),
(6, 'Sobrenatural'),
(7, 'Thriller'),
(8, 'Seinen'),
(9, 'Deportes'),
(10, 'Comedia'),
(11, 'Romance');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `id` int(11) NOT NULL,
  `comentario_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `respuesta` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(500) NOT NULL,
  `contrasenia` varchar(500) NOT NULL,
  `foto` varchar(200) NOT NULL DEFAULT 'user01.png',
  `tipo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `contrasenia`, `foto`, `tipo`) VALUES
(8, 'EzzMellow', 'ezequielanthonymelo@gmail.com', '$2b$10$V/LvuUbSvILOeEUWQc5axufvNbHc56NMJRTVLA4N2rl4CbakQ60OC', 'user01.png', 0),
(9, 'Juanpalit', 'juanpactz@gmail.com', '$2b$10$M14LSTnUB/YyFf26klaYFuHLM1zyIT9gvK0pit1KxsDssz5XGqmcu', 'user01.png', 0),
(10, 'nani', 'nani@hotmail.com', '$2b$10$a2dMeDVFxCrn.mVTGahRxe8boV.SL35GWzo0Mi8RgUP1GHJKs6Ppa', 'user01.png', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_favoritos`
--

CREATE TABLE `usuario_favoritos` (
  `usuario_id` int(11) NOT NULL,
  `anime_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario_favoritos`
--

INSERT INTO `usuario_favoritos` (`usuario_id`, `anime_id`) VALUES
(8, 1),
(8, 4),
(8, 11),
(9, 1),
(9, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votos`
--

CREATE TABLE `votos` (
  `id` int(11) NOT NULL,
  `anime_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `voto` enum('positivo','negativo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `votos`
--

INSERT INTO `votos` (`id`, `anime_id`, `usuario_id`, `voto`) VALUES
(4, 1, 8, 'positivo'),
(5, 3, 8, 'positivo'),
(6, 1, 9, 'positivo'),
(7, 4, 8, 'positivo'),
(8, 4, 9, 'positivo'),
(9, 2, 9, 'positivo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `animes`
--
ALTER TABLE `animes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `animes_generos`
--
ALTER TABLE `animes_generos`
  ADD PRIMARY KEY (`anime_id`,`genero_id`),
  ADD KEY `genero_id` (`genero_id`) USING BTREE,
  ADD KEY `anime_id` (`anime_id`) USING BTREE;

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `anime_id` (`anime_id`);

--
-- Indices de la tabla `episodios`
--
ALTER TABLE `episodios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `anime_id` (`anime_id`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comentario_id` (`comentario_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario_favoritos`
--
ALTER TABLE `usuario_favoritos`
  ADD PRIMARY KEY (`usuario_id`,`anime_id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `anime_id` (`anime_id`);

--
-- Indices de la tabla `votos`
--
ALTER TABLE `votos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `anime_id` (`anime_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `animes`
--
ALTER TABLE `animes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `episodios`
--
ALTER TABLE `episodios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `votos`
--
ALTER TABLE `votos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `animes_generos`
--
ALTER TABLE `animes_generos`
  ADD CONSTRAINT `animes_generos_ibfk_1` FOREIGN KEY (`genero_id`) REFERENCES `generos` (`id`),
  ADD CONSTRAINT `animes_generos_ibfk_2` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`);

--
-- Filtros para la tabla `episodios`
--
ALTER TABLE `episodios`
  ADD CONSTRAINT `episodios_ibfk_1` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`comentario_id`) REFERENCES `comentarios` (`id`),
  ADD CONSTRAINT `respuestas_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `usuario_favoritos`
--
ALTER TABLE `usuario_favoritos`
  ADD CONSTRAINT `usuario_favoritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `usuario_favoritos_ibfk_2` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`);

--
-- Filtros para la tabla `votos`
--
ALTER TABLE `votos`
  ADD CONSTRAINT `votos_ibfk_1` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`),
  ADD CONSTRAINT `votos_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
