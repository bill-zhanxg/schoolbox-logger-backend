export async function getXataFile(
	file?: File | null,
	enablePublicUrl = false,
): Promise<
	| [
			{
				name: string;
				mediaType: string;
				base64Content: string;
				enablePublicUrl: boolean;
			},
			null,
	  ]
	| [null, File]
	| [null, null]
	| string
> {
	if (file && file.size > 104_000_000) return 'Evidence file size can not be larger than 104MB';

	if (!file || (file.name === 'undefined' && file.size === 0 && file.type === 'application/octet-stream'))
		return [null, null];
	if (file.size < 20_000_000) {
		const arrayBuffer = await file.arrayBuffer();
		return [
			{
				name: file.name,
				mediaType: file.type,
				base64Content: Buffer.from(arrayBuffer).toString('base64'),
				enablePublicUrl,
			},
			null,
		];
	} else return [null, file];
}
