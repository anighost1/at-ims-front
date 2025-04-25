import { addCategory } from "@/lib/apiCalls/category";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddCategory() {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const description = e.target.description.value;
        const data = { name, description };
        mutation.mutate(data);
        e.target.reset();
        document.getElementById('my_modal_6').checked = false;
        console.log(data);
    }

    return (
        <>

            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label htmlFor="my_modal_6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="text-lg font-bold">Add Category</h3>
                        <div className="divider" />
                        <div className="flex flex-col gap-2">
                            <input type="text" required id="name" placeholder="Name" className="input w-full" />
                            <input type="text" id="description" placeholder="Description" className="input w-full" />
                        </div>
                        <div className="divider" />
                        <div className="modal-action">
                            <button type="submit" className="btn btn-outline btn-success w-full">Add</button>
                        </div>
                    </form>
                </div>
            </div >
        </>
    );
}
