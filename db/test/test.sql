SELECT menuitems.name AS name, menuitems.image AS image, menuitems.price AS price
FROM cartitems
JOIN menuitems ON menuitems.id = menuitem_id
WHERE cartitems.checkout = 'f' AND user_id = 2;