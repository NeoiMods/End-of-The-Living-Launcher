require "InventoryTetris/TetrisItemData";
require "InventoryTetris/TetrisContainerData";

Events.OnGameBoot.Add(function() 

	local itemPack = {
	}

	local containerPack = {
		["none"] = {
			["gridDefinitions"] = {
				[1] = {
					["size"] = {
						["width"] = 1,
						["height"] = 1,
					},
					["position"] = {
						["x"] = 3,
						["y"] = 0,
					},
				},
				[2] = {
					["size"] = {
						["width"] = 1,
						["height"] = 1,
					},
					["position"] = {
						["x"] = 0,
						["y"] = 0,
					},
				},
				[3] = {
					["size"] = {
						["width"] = 1,
						["height"] = 2,
					},
					["position"] = {
						["x"] = 1,
						["y"] = 0,
					},
				},
				[4] = {
					["size"] = {
						["width"] = 1,
						["height"] = 2,
					},
					["position"] = {
						["x"] = 2,
						["y"] = 0,
					},
				},
			},
			["centerMode"] = "vertical",
			["isOrganized"] = true,
		},
	}

	TetrisItemData.registerItemDefinitions(itemPack)
	TetrisContainerData.registerContainerDefinitions(containerPack)
end)
