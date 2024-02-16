export function chunk<T>(array: T[], chunkSize = 1000): T[][] {
	const R = [];
	for (let i = 0, len = array.length; i < len; i += chunkSize) R.push(array.slice(i, i + chunkSize));
	return R;
}
