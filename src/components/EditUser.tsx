import {SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {Session} from "@auth/core/types";
import {useEffect, useState} from "react";

export function EditUser(props: { user: Session, status }) {
    const [ data, setData ] = useState({
        userId: "",
        name: ""
    })

    useEffect(() => {
        setData({
            userId: props.user.token.sub,
            name: props.user.session.user.name
        })
    }, [props.user])


    const editProfile = async (e) => {
        e.preventDefault();

        // TODO: continue zde
    }

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Edit Profile</SheetTitle>
                <SheetDescription>
                    Here you can edit your profile, add profile picture.
                    In the future even change password/username/email.
                </SheetDescription>
            </SheetHeader>

            <form onSubmit={editProfile}>
                <input name={"name"} value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
                <button type={"submit"}>submit</button>
            </form>

        </SheetContent>
    );
}