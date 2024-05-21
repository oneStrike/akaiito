"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeletion = void 0;
const softDeletion = async (context, where) => {
    try {
        const deleteRes = await context.update({
            where,
            data: {
                deletedAt: new Date()
            }
        });
        return deleteRes.id;
    }
    catch (e) {
        return null;
    }
};
exports.softDeletion = softDeletion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29mdERlbGV0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic29mdERlbGV0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFPLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFBSyxPQUFVLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDOUQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxTQUFTLEdBQUcsTUFBTyxPQUFlLENBQUMsTUFBTSxDQUFDO1lBQzlDLEtBQUs7WUFDTCxJQUFJLEVBQUU7Z0JBQ0osU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO2FBQ3RCO1NBQ0YsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxTQUFTLENBQUMsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ1gsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBWlksUUFBQSxZQUFZLGdCQVl4QiJ9