-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-10-2024 a las 11:01:15
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `chivochop`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `talla` varchar(250) NOT NULL,
  `estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`id`, `id_producto`, `id_user`, `cantidad`, `talla`, `estado`) VALUES
(63, 8, 17, 1, '', 'comprado'),
(64, 3, 17, 10, '', 'comprado'),
(65, 7, 17, 1, '', 'comprado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `comentario` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(11,2) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `img` varchar(250) NOT NULL,
  `tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `descripcion`, `img`, `tipo`) VALUES
(1, 'Tornillo 2x8', 0.06, 'Tornillo de acero para madera', 'tornillo2.jpg', 'Tornillo'),
(2, 'Tornillo 3/4 Goloso', 0.08, 'Tornillo Goloso 6x3/4', 'tornillo3.jpg', 'Tornillo'),
(3, 'Tornillo Zinc 2x8', 0.10, 'Tornillo Negro para Lamina ', 'tornillo1.jpg', 'Tornillo'),
(4, 'Lámina de aluminio zinc 4.50m 26', 32.00, 'LÁMINA DE ACERO CON RECUBRIMIENTO DE ALUZINC APTAS PARA USO EN CUBIERTAS', 'lamina.jpg', 'Lamina'),
(5, 'Lámina Troquelada Galvanizada', 28.50, 'lamina polipropileno verde 3,6', 'lamina2', 'Lamina'),
(6, 'Lámina galvanizada canal 2x1 ', 12.25, 'Lámina galvanizada canal 2x1 yarda (1.82x0.91 m) calibre 26 (0.45 mm)', 'lamina3.jpg', 'Lamina'),
(7, 'Galon de pintura Megacolor Premium', 11.95, 'Galon de pintura Megacolor Premium color cereza ', 'megacolorP.png', 'Pintura'),
(8, '1/4 pintura de aceite megacolor', 4.25, '1/4 pintura de aceite megacolor', 'megacolorE.jpg', 'Pintura'),
(9, 'Cubeta SW', 60.00, 'Cubeta de Pintura Sherwin Williams LATEX', 'cubeta.webp', 'Pintura'),
(10, 'Spray LATEX', 2.50, 'Para sus mejores pinturas', 'spray.png', 'Pintura'),
(11, 'Rataton', 2.00, 'Para evitar plagas de ratas', 'rataton.png', 'Veneno'),
(12, 'Cuckol', 3.85, 'Veneno para cucas ', 'cuckol.jfif', 'Veneno'),
(13, 'Exterminator Cebo en Polvo', 4.45, 'La presentación de este producto permite usarlo fácilmente, aplicándolo en cajitas pequeñas o tapas de envases. Con dos aplicaciones por tres semanas se garantiza exterminio de cucarachas por un periodo de seis meses.', 'Exterminator.png', 'Veneno'),
(14, 'Raid', 2.95, 'Veneno para moscas y otro tipo de insectos', 'raid.jfif', 'Veneno'),
(15, 'bombillo', 5.99, 'bombillo led', 'bombillo.jpg', 'Pintura');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `user` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `pass` varchar(250) NOT NULL,
  `rol` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `user`, `email`, `pass`, `rol`) VALUES
(1, 'admin', 'admin@gmail.com', '12345', 'admin'),
(17, 'Marcelo', 'marcelo@gmail.com', 'marcelo10', 'user');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
