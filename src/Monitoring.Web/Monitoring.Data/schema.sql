--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `id` int(11) NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_active` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;


CREATE TABLE `measurements` (
  `id` int(11) NOT NULL,
  `humidity` float UNSIGNED NOT NULL,
  `temperature` float UNSIGNED NOT NULL,
  `time_stamp` datetime NOT NULL,
  `device_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `measurements`
--
ALTER TABLE `measurements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_DEVICES_ID` (`device_id`) USING BTREE,
  ADD KEY `time_stamp` (`time_stamp`) USING BTREE;

--
-- Constraints for table `measurements`
--
ALTER TABLE `measurements`
  ADD CONSTRAINT `FK_DEVICES_ID` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`);
