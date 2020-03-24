function screenToWorldCoords(mx, my, v) {
	return [
		(mx - width / 2) / v.s - v.x,
		(my - height / 2) / v.s - v.y
	];
}

var truncCache = new Cache(20);
/**
 * Truncate a string to fit within a certain pixel width. Returns either the
 * original string if no truncation is needed, or a truncated string suffixed
 * with '...' to indicate truncation.
 *
 * Caches past results in a custom cache.
 */
function truncate(str, w) {
	const startW = textWidth(str);
	if (startW <= w) return str;
	if (truncCache.has([str, w].toString())) return truncCache.get([str, w].toString());

	let i = 1;
	let trunc = str.slice(0, -i) + '...';
	while (textWidth(trunc) > w && trunc !== '...') {
		trunc = str.slice(0, -i - 1) + '...';
		++i;
	}
	truncCache.set([str, w].toString(), trunc);
	return trunc;
}
