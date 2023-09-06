export declare class User {
    id: number;
    kakaoId: string;
    email: string;
    name: string | null;
    gender: string;
    phone: string;
    birth: string;
    profileImage: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    authorities?: any[];
}
