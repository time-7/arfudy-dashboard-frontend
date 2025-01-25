import { ComponentProps, useRef, useState } from 'react';

import { ImageUp, Loader } from 'lucide-react';
import { toast } from 'sonner';

import { useEdgeStore } from '@/lib/edgestore';

import { Button } from './ui/button';

type TUploadImageButton = ComponentProps<typeof Button> & {
    setImage(url: string): void;
};

export default function UploadImageButton({
    setImage,
    ...buttonProps
}: TUploadImageButton) {
    const [progress, setProgress] = useState<number>(0);
    const { edgestore, state } = useEdgeStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <Button
            {...buttonProps}
            type="button"
            disabled={Boolean(progress)}
            onClick={() => fileInputRef.current?.click()}
        >
            <input
                accept="image/*"
                type="file"
                hidden
                ref={fileInputRef}
                onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                        edgestore.publicFiles
                            .upload({
                                file,
                                onProgressChange: (progress) =>
                                    setProgress(progress)
                            })
                            .then((response) => {
                                setImage(response.url);

                                toast.success('Imagem importada com sucesso');
                            })
                            .catch(() =>
                                toast.error('Falha ao importar imagem')
                            )
                            .finally(() => setProgress(0));
                    }
                }}
            />
            {progress ? <Loader className="animate-spin" /> : <ImageUp />}
            {progress ? `${progress} %` : 'Importar imagem'}
        </Button>
    );
}
